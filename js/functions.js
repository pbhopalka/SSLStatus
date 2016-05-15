
var notifyUSER = function(data) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(data);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(data);
      }
    });
  }

  // Finally, if the user has denied notifications and you
  // want to be respectful there is no need to bother them any more.
};

var sendData = function(URL, type, formData){
  var xhr = new XMLHttpRequest();
  xhr.open(type, URL, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log('OUTPUT: ' + xhr.responseText);
    }
  };
  xhr.send(formData);
  console.log("FINISH");
  return xhr.responseText;
};

var a =
`
 .d8888b.  888                       888
d88P  Y88b 888                       888
Y88b.      888                       888    This is a browser feature intended for
 "Y888b.   888888  .d88b.  88888b.   888    developers. If someone told you to copy
    "Y88b. 888    d88""88b 888 "88b  888    and paste something here to enable a
      "888 888    888  888 888  888  Y8P    Shrimadhav U K feature or "hack" someone's
Y88b  d88P Y88b.  Y88..88P 888 d88P         account, it is a scam and will give them
 "Y8888P"   "Y888  "Y88P"  88888P"   888    access to your SpEcHiDe account.
                           888
                           888
                           888

See https://www.facebook.com/selfxss for more information.
`;
console.log(a);

function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id = profile.getId();
  // Do not send to your backend! Use an ID token instead.
  console.log('ID: ' + id);
  var name = profile.getName();
  console.log('Logged in as: ' + name);
  var gname = profile.getGivenName();
  console.log('Given Name: ' + gname);
  var famname = profile.getFamilyName();
  console.log('Family Name: ' + famname);
  var img = profile.getImageUrl();
  console.log('Image URL: ' + img);
  var email = profile.getEmail();
  console.log('Email: ' + email);
  //var id_token = googleUser.getAuthResponse().id_token;
  //console.log('Token: ' + id_token);
  var result = sendData('http://projects.shrimadhavuk.me/lib/verifyuser.php','POST', 'user_id='+id+'f_name='+gname+'l_name='+famname+'imgurl='+img+'email_id='+email);
  console.log(result);
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
