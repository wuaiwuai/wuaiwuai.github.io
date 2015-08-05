var token = 'd97ea9d9f5247bd0c390fa86b9347fd2abd61e2b0b6e774a38f0342b579297d0';
var url = 'https://api.dribbble.com/v1/users/jondang/shots?access_token=' + token;
var data;
var dribbbleItems = 5;  // the number of items to display in the dribbble module

function init() {
  var cookie = getCookie('wuaiwuai.github.io');

  // if cookie exist, use cookie data to render
  if ( cookie.length > 0 ) {
    renderDribbble(JSON.parse(cookie));
  }
  // if not, get new data
  else {
    getDribbbleData();
  }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getDribbbleData () {
  var ajaxResponse = $.ajax({
    url: url,
    dataType: 'json'
  });

  ajaxResponse
    .success(function(res) {
      data = res;
      renderDribbble(data);
      // set cookie with data
      setCookie('wuaiwuai.github.io', JSON.stringify(data), 1);
    })
    .fail(function() {
      console.log('could not get data');
    });
}

function renderDribbble(data) {
  var $el = $('#dribbble-list');
  for (var i = 0; i < dribbbleItems; i++) {
    $el.append('<li><a href="' + data[i].html_url + '">' + data[i].title + '</a></li>');
  }
}

document.addEventListener('DOMContentLoaded', init);
