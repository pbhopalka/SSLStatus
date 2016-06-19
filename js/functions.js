
var notifyUSER = function(data) {

  navigator.serviceWorker.register('js/sw.js');

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support system notifications");
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

  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(data);
      });
    }
  });
  // Finally, if the user has denied notifications and you
  // want to be respectful there is no need to bother them any more.
};

var sendData = function(URL, type, formData, callBack){
  var xhr = new XMLHttpRequest();
  xhr.open(type, URL, true);
  if(type == "POST"){
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = xhr.responseText;
      console.log('OUTPUT: ' + response);
      callBack(response);
    }
  };
  if(type == "GET"){
    xhr.send();
  }
  else if(type == "POST"){
    xhr.send(formData);
  }
};

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
  sendData('//projects.shrimadhavuk.me/lib/verifyuser.php','POST', 'user_id='+id+'&f_name='+gname+'&l_name='+famname+'&imgurl='+img+'&email_id='+email, after_signin);
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
      document.getElementById("main-viewport").style.display = "none";
      document.getElementById("my-signin2").style.display = "block";
      console.log('User signed out.');
    });
}

function after_signin(result){
  console.log(result);
  if(result === "f" || result === "ff"){
    console.log("error");
  }
  else{
    // user successfully signed in
    document.getElementById("main-viewport").style.display = "block";
    document.getElementById("my-signin2").style.display = "none";
    console.log("verified");
  }
}

var split_and_notify = function(data){
  notifyUSER(data.split('|')[1]);
};

sendData("//projects.shrimadhavuk.me/lib/sslstatus.php", "GET", "", split_and_notify);
