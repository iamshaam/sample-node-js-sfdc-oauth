var authorisationcode ;
var clientId ;

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function startWSFlow()
  {
    console.log('Starting WS Flow');
    document.getElementById('WSFlowBlock').style.display = "block";
  }

  function authoriseWS(){
    console.log('Starting WS Flow');
    var loginURL = "https://login.salesforce.com";
    var client_id =  document.getElementById("clientid").value;
    var redirect_uri = 'http://localhost:5244/callback.html';
    var loginWindowURL = loginURL + '/services/oauth2/authorize?response_type=code&client_id='+ client_id +'&redirect_uri='+redirect_uri;
    console.log('endploginWindowURLoint-'+loginWindowURL);
    window.open(loginWindowURL, '_blank', 'location=no');
  }

function oauthCallback(url) {
    console.log('inside oauthCallback:'+url);
    var queryString,
        obj;

    if (url.indexOf("code=") > 0) {
        queryString = url.substr(url.indexOf('#') + 1);
        obj = parseQueryString(queryString);
        oauth = obj;
        console.log(JSON.stringify(obj));
    } 
    document.getElementById('authorisationcode').innerHTML = obj['http://localhost:5244/callback.html?code'];
    authorisationcode = obj['http://localhost:5244/callback.html?code'];
    document.getElementById('WSFlowDataBlock').style.display = "block";
    
}

function getAccessToken()
{
    var xhttp = new XMLHttpRequest();
    /*xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("accesstoken").innerHTML =
        this.responseText;
      }
    };*/
    
    var loginURL = "https://azman-dev-ed.lightning.force.com";
    var client_id =  document.getElementById("clientid").value;
    var client_secret =  document.getElementById("client_secret").value;
    var redirect_uri = 'http://localhost:5244/callback.html';
    var tokenURL = loginURL +'/services/oauth2/token?grant_type=authorization_code';
    tokenURL += '&code='+authorisationcode;
    tokenURL += '&client_id='+'3MVG9G9pzCUSkzZsfvXmaMCzr.o.1k_057v.CAYsfXPp8Ttey.SwHgDnLzLKTcNVDedlxaAXEI7hDQq0PASvP';
    tokenURL += '&client_secret='+'2B9DEC655720E2522DAAF27AA33E4C84BFB0224775CD8B95580F2E622173F70A';
    tokenURL += '&redirect_uri='+redirect_uri;  
    //xhttp.open("POST", tokenURL, true);
    //xhttp.send();
    window.open(tokenURL, '_blank', 'location=no');
}


function parseQueryString(queryString) {
  var qs = decodeURIComponent(queryString),
      obj = {},
      params = qs.split('&');
  params.forEach(function (param) {
      var splitter = param.split('=');
      obj[splitter[0]] = splitter[1];
  });
  return obj;
}