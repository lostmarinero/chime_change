//  FORMAT JSON OBJECT
// Chimes {
// screen_name,
// userImg
// tweet_id,
// tweet,
// fav_count,
// lat,
// long,
// actions[]="donate,volutneer"
// }


// - Get chimes (set timeout) and loop through it and it clears
// - latest 100 chimes
// - after display chimes reset a timer 
// - add event listeners for scrolling

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;



var map, geocoder, marker,
  ey, my, mouseDown = false;


var o = {
  init: function(){
    this.map.init();
    //this.twitter.show();
    //this.twitter.click();
    this.scroll.init();
  },
  map: {
    size: function(){
      var w = $(window).width(),
        h = $(window).height();
      return { width: w, height: h }
    },
    data: {
      zoom: 3,
      center: new google.maps.LatLng(52, 23),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    init: function(){
      var size = o.map.size();
      $('#map').css({ width: size.width, height: size.height });
      map = new google.maps.Map(document.getElementById('map'), o.map.data),
      geocoder = new google.maps.Geocoder();
      google.maps.event.addListener(map, 'dragstart', function(){
        $('.posts').hide();
      }); 
    }
  },
  scroll: {
    mouse: function(e){
      var y = e.pageY; 
      return y;
    },
    check: function(y){
      var all = $('.twitter').height(),
        inside = $('.twitter').find('.inside').height();
      if (y < (all - inside)) {
        y = all - inside;
      } else if (y > 0) {
        y = 0;
      }
      return y;
    },
    update: function(e){
      var y = o.scroll.mouse(e),
        movey = y-my,
        top = ey+movey;
        check = o.scroll.check(top);
      $('.twitter').find('.inside').css({ top: check+'px' });
    },
    init: function(){
      $('.twitter').find('.inside').bind({
        mousedown: function(e){
          e.preventDefault();
          mouseDown = true;
          var mouse = o.scroll.mouse(e);
            my = mouse;
          var element = $(this).position();
            ey = element.top;
          o.scroll.update(e);
        },
        mousemove: function(e){
          if (mouseDown)
            o.scroll.update(e);
          return false;
        },
        mouseup: function(){
          if (mouseDown)
            mouseDown = false;
          return false;
        },
        mouseleave: function(){
          if (mouseDown)
            mouseDown = false;
          return false;
        }
      });
    }
  }


  twitter: {

    //// API CALL TO SHARONS API - HIT OUR SERVER FOR JSON RESPONSE WITH LAT CALL

    getChimes: function() {
      var chimeData = new Array();
      $.getJSON('/chimes/json', function(data) {
        for (i in data){
          var info = data[i];
          var chime = {
            created_at : info['chimes'][0]['created_at'],
            tweet_id : info['chimes'][0]['tweet_id'],
            favorite_count : info['chimes'][0]['favorite_count'],
            retweet_count : info['chimes'][0]['retweet_count'],
            img : info['chimes'][0]['user']['profile_image_url'],
            screen_name : info['chimes'][0]['user']['screen_name'],
            user_id : info['chimes'][0]['user']['id'],
            name : info['chimes'][0]['user']['name'],
            // tweet : info['chimes'][0]['tweet'],
            lat : info['chimes'][0]['geo']['coordinates'][0],
            lon : info['chimes'][0]['geo']['coordinates'][1],
            // place : info['chimes'][0]['place'],
            // tweet_url : info['url']
            // action : info['chimes'][0]['action']; 
          }
        chimeData.push(chime);
        }
      }


      return chimeData
      }


"chimes": [
    {
      "created_at": "Sat Dec 07 19:49:44 +0000 2013",
      "tweet_id": "409409410344050688",
      "favorite_count": 0,
      "retweet_count": 0,
      "geo": {
        "coordinates": [
          37.7770344,
          -122.4156406
        ],
        "type": "Point"
      },
      "place": {
        "name": "SoMa",
        "country": "United States",
        "country_code": "US",
      },
      "user": {
        "name": "Snowmenotti",
        "profile_image_url": "http://pbs.twimg.com/profile_images/378800000833866132/b3e84c7c81f978e984a634e2f127168c_normal.png",
        "location": "San Francisco, CA",
        "id": "15067515",
        "screen_name": "44"
      }
    }
  ]


    
    click: function(){
      $('.twitter').find('.open').live('click', function(){
        var t = $(this), rel = t.attr('rel');
        o.twitter.open(rel);
      });
    },
    open: function(user){
      var posts = $('.posts'), arr = new Array;
      $.getJSON('http://twitter.com/status/user_timeline/'+user+'.json?count=5&callback=?', function(data) {
        $.each(data, function(i, post){
          arr.push('<div class="post">');
          arr.push(post.text);
          arr.push('</div>');
        });
        var html = arr.join('');
        posts.html(html).fadeIn();
      });
    }
  },



}


