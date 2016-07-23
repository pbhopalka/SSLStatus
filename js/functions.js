
var THE_REAL_CORS_URL = "https://projects.shrimadhavuk.me/tracker/cors.php";
var SSL0N3R_BASE_URL = "http://athena.nitc.ac.in/shrimadhav_b130253cs/SSL0N3R";
var ATHENA_STATUS_URL = "http://athena.nitc.ac.in/status.txt";
var ATHENA_CORS_URL = SSL0N3R_BASE_URL + "/cors.php";
var SSL_W0L_URL = SSL0N3R_BASE_URL + "/turnon.php";

var notifyUSER = function(data) {
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

var sendData = function(type, URL, formData){
  // => http://stackoverflow.com/a/30008115/4723940
  return new Promise(function (resolve, reject) {
    // create a XHR object
    var xhr = new XMLHttpRequest();
    // open the XHR object in asynchronous mode
    xhr.open(type, URL, true);
    if(type == "POST"){
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');
    }
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      }
      else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    // GET or POST the URL according to type
    if(type == "GET"){
      xhr.send();
    }
    if(type == "POST"){
      xhr.send(formData);
    }
  });
};

var IsAthenaOpen = function(){
  var status = false;
  sendData("POST", THE_REAL_CORS_URL , "q=" + encodeURIComponent(ATHENA_STATUS_URL))
  .then(
    function(data){
      if(data.split('|')[0] == "open"){
        status = true;
        document.getElementById('IsAthenaOpen_result').style = "background-color: #3B8516; color: #f5f5f5; text-align: center;";
        document.getElementById('IsAthenaOpen_result').innerHTML = data;
      }
      else{
        status = false;
        document.getElementById('IsAthenaOpen_result').style = "background-color: #D2101E; color: #fff; text-align: center;";
        document.getElementById('IsAthenaOpen_result').innerHTML = data;
      }
    }
  )
  .catch(function(err){
    status = false;
    console.log("IsAthenaOpen: " + err.status + ", " + err.statusText);
  });
};

var IsSSLSystemOn = function(sslno){
  var status = false;
  console.log("IsSSLSystemOn: ");
  sendData("POST", THE_REAL_CORS_URL, "q=" + encodeURIComponent(SSL_W0L_URL + "/status/ssl-" + sslno))
  .then(function(data){
    console.log(data);
  })
  .catch(function(err){
    status = false;
    console.log("IsSSLSystemOn: " + err.status + ", " + err.statusText);
  });
};

var TurnOnSSLSystem = function(sslno){
  var status = false;
  console.log("TurnOnSSLSystem: ");
  sendData("POST", THE_REAL_CORS_URL, "q=" + encodeURIComponent(SSL_W0L_URL + "/status/ssl-" + sslno))
  .then(function(data){
    var jsonobj = JSON.parse(data);
    if(jsonobj.status == "success"){
      status = true;
      document.getElementById('TurnOnSSLSystem_result').style = "background-color: #3B8516; color: #f5f5f5; text-align: center;";
      document.getElementById('TurnOnSSLSystem_result').innerHTML = "YES";
    }
    else{
      status = false;
      document.getElementById('TurnOnSSLSystem_result').style = "background-color: #D2101E; color: #fff; text-align: center;";
      document.getElementById('TurnOnSSLSystem_result').innerHTML = "NO";
    }
  })
  .catch(function(err){
    status = false;
    console.log("TurnOnSSLSystem: " + err.status + ", " + err.statusText);
  });
};

var IsEmailValid = function(email){
  console.log("IsEmailValid: " + "not implemented");
  console.log("not implemented" + email);
};

var SSHToSSLSystem = function(username, sslno){
  var password = prompt('input SSH password: ');
  console.log("SSHToSSLSystem: ");
  console.log("not implemented" + username + "@ssl-" + sslno + "::" + password);
};
