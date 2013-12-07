
var coder, marker, location,
	ey, my, mouseDown = false;
	
var o = {
	init: function(){
		this.map.init();
		this.chimes = new Array();
		this.getChimes();
	},

  map: {
		size: function(){
			var w = $(window).width(),
				h = $(window).height();
			return { width: w, height: h }
		},

		getData: function() {
		  var center = new google.maps.LatLng(37.7749300, -122.4194200); // default SF, CA
		  navigator.geolocation.getCurrentPosition(function(position) {
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
			$('#map-canvas').css({ width: size.width, height: size.height });
			map = new google.maps.Map(document.getElementById('map-canvas'), o.map.getData());
			geocoder = new google.maps.Geocoder();
			o.map.show();
			google.maps.event.addListener(map, 'dragstart', function(){
				$('.posts').hide();
			}); 
		}
	},
  getChimes: function() {
	  $.getJSON('/chimes.json', function(data) {
	    var info = data['chimes'];
	    for (i in info) {
	    	// console.log(info[i]);

		    var chime = {
		      created_at : info[i]['created_at'],
	        tweet_id : info[i]['tweet_id'],
	        favorite_count : info[i]['favorite_count'],
	        retweet_count : info[i]['retweet_count'],
	        img : info[i]['user']['profile_image_url'],
	        screen_name : info[i]['user']['screen_name'],
	        user_id : info[i]['user']['id'],
	        name : info[i]['user']['name'],
	        tweet : info[i]['tweet_text'],
	        latitude : info[i]['latitude'],
	        longitude : info[i]['longitude']
	        // country : info[i]['country'],
	        // tweet_url : info[i]['tweet_url']
	        // action : info[i]['action']; 
		    }

		    var locations = [[34.0500, -118.2500 ], [40.6700, -73.9400], [51.5072, 0.1275], [45.4667,  9.1833]]
		    var location = locations[Math.floor(Math.random()*locations.length)];
		    
	      if (chime.longitude === null) {
	        chime.latitude = location[1];
	        chime.longitude = location[0];
	      }

	      console.log(chime);
				o.map.createMarker(chime);
		    o.chimes.push(chime);
   	  }

	    return true;
	  });
	}//,

	// loadData: function() {
	// 	console.log(o.chimes);
	// 	for (i in o.chimes){
	// 		o.map.createMarker(o.chimes[i]);
	// 	}
	// }
}




$(function(){ 
o.init(); 
// o.getChimes();
// o.loadData(); //TODO needs to go in timer


});
