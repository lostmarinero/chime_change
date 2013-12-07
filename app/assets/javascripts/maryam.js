
coder, marker, location,
	ey, my, mouseDown = false;
	
	

var o = {
	init: function(){
		this.map.init();
		
	},
    map: {
		size: function(){
			var w = $(window).width(),
				h = $(window).height();
			return { width: w, height: h }
		},

		getData: function() {
		  var center = new google.maps.LatLng(37.7749300, -122.4194200); // default SF, CA
		  navigator.geolocation.getCurrentPosition(function() {
		     center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		   });
		   return {
				zoom: 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: center
			};
		},

        // Drops a Pin
	    createMarker: function(chime) {
		    var image = {
			  url: chime.img,
			  size: new google.maps.Size(20, 20),
			};
		  var marker =  new google.maps.Marker(
		    {icon: image, map: map, title: chime.screen_name, position: new google.maps.LatLng(chime.longitude, chime.latitude)});
		
		  google.maps.event.addListener(marker, 'click', function(){
			  alert("hello world");
			// this is where the click handler will go
		  }); 
		  return marker;
		},
		
		show: function(){
			var c = new Object();
			c.screen_name = "Maryam";
			c.img = "http://pbs.twimg.com/profile_images/378800000833866132/b3e84c7c81f978e984a634e2f127168c_normal.png";
			c.title="Hello World";
			c.longitude=32.9310417;
			c.latitude=-80.0364981;
			this.createMarker(c);
		},
		init: function(){
			var size = o.map.size();
			$('#map').css({ width: size.width, height: size.height });
			map = new google.maps.Map(document.getElementById('map'), o.map.getData());
			geocoder = new google.maps.Geocoder();
			o.map.show();
			google.maps.event.addListener(map, 'dragstart', function(){
				$('.posts').hide();
			}); 
		}
	},

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
	},

	loadData: function() {
		var all_chimes = o.map.getChimes();
		for (i in all_chimes){
			o.map.createMarker(i)
		}
	}

}




$(function(){ o.init(); 



});
