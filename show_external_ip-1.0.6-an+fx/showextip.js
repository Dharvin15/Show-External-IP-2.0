/*
  Function to  get the ip address, location and timezone of current external ip address
  from ipinfo.io
*/
function getGeoInfo(callback, errorCallback) {
  var geoUrl = 'https://ipinfo.io/json'; // Any site used here must be present in manifest.json.
  var x = new XMLHttpRequest();
  x.open('GET', geoUrl);
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from ipinfo API
    var response = x.response;
    if (!response) {
      errorCallback('No response.');
      return;
    }
  
  callback(response);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

/*
  Function go load the images to the page
*/
function renderRefreshing() {
  var imgs = [
    document.createElement("img"),
    document.createElement("img"),
    document.createElement("img"),
  ];
	var ipSpan = document.getElementsByClassName("cont");
  for (var i = 0; i < ipSpan.length; i++) {
    imgs[i].src = "66.gif";
	  ipSpan[i].replaceChild(imgs[i], ipSpan[i].childNodes[2]);
  }

  var copyImg = document.createElement("img");
  copyImg.src = "icons8-copy-96.png";
  copyImg.width = 20;
  copyImg.height = 20;
  var btn = document.getElementById('btn');
  btn.appendChild(copyImg);
}

/*
  Function to change ip address, location and timezone 
  and click button to copy ip address
*/
function renderText(statusText) {
	document.getElementById('ip').textContent = statusText.ip;
	document.getElementById('location').textContent = statusText.city + ", " + statusText.region + ", " + statusText.country;
	document.getElementById('timezone').textContent = statusText.timezone;
	var ipSpan = document.getElementsByClassName("cont");
  for (var i = 0; i < ipSpan.length; i++) {
	  ipSpan[i].removeChild(ipSpan[i].childNodes[2]);
  }

  var btn = document.getElementById('btn');
  btn.addEventListener('click', copy());
}

/*
  Function to copy ip address to clipboard
*/
function copy() {
  /* Get the text field */
  var copyText = document.getElementById("ip");
  navigator.clipboard.writeText(copyText.innerHTML);
}

document.addEventListener('DOMContentLoaded', function() {
    renderRefreshing();

    getGeoInfo(function(geoInfo) {
      console.log(geoInfo);
      renderText(geoInfo);

    }, function(errorMessage) {
      renderText('Unable to refresh. ' + errorMessage);
    });
});

