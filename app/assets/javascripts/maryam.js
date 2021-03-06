
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
			var w = $('#map-container').width(),
				h = ($(window).height() * (0.7))
			return { width: w, height: h }
		},

		resize: function(){
			var w = $('#map-container').width(),
				h = ($(window).height() * (0.7));
				$('#map-canvas').css({ width: w, height: h });

				o.getChimes();
			// var w2 = $('.ticker_item').width(),
			// 	h2 = $('.ticker_item').height();
			// 	$('.ticker_item').css({ width: w2, height: h2 });
			},

		createTicker: function (chimes) {
			if (!chimes) {
		    console.log("return..no chimes");
			}

			var html="<ul>";
		  for(var i=0; i<chimes.length; i++) {
		    var c = chimes[i];
		      var button = "";
		      button += c.is_give ? "<button class='btnGive'>Give</button>" : "";
		      button += c.is_volunteer ? "<button class='btnHelp'>Help</button>" : "";
		      button += "<button class='btnKudos'>Kudos</button>";
		      button += "<button class='btnShare'>Share</button>";
		      html+="<li class='ticker_item'><span>" + c.tweet + "</span>&nbsp;&nbsp;" + button + "</li>";
		    }
		    html +="</ul>";
		    var url = c.action_url ? c.action_url : "http://www.chimeforchange.org/pillars/education";
		    $('#tweet_data').empty();
		    $('#tweet_data').append($(html));
		    $('#tweet_data').vTicker('init', {padding:4});
		    $('.btnGive').click(function() {
		    	window.location.href = url;
		    });
		    $('.btnHelp').click(function() {
					window.location.href = "http://www.catapult.org/team/frida-giannini";
		    });
		    $('btnKudos').click(function() {
					window.location.href = "https://twitter.com/intent/favorite?tweet_id=" + c.tweet_id;
		    });
		    $('btnShare').click(function() {
		    	window.location.href = "https://twitter.com/intent/retweet?tweet_id=" + c.tweet_id;
		    });
		},

		getData: function() {
		  var center = new google.maps.LatLng(37.7749300, -122.4194200); // default SF, CA
		  navigator.geolocation.getCurrentPosition(function(position) {
		     center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		   });
		   return {
				zoom: 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: center,
				panControl: true,
    		zoomControl: true,
    		streetViewControl: false,
    		overviewMapControl: false
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
	  		window.location.replace(chime.tweet_url);
	  	}); 
		  return marker;
		},
		
		show: function(){
			var c = new Object();
			c.screen_name = "Maryam";
			c.img = "http://pbs.twimg.com/profile_images/378800000833866132/b3e84c7c81f978e984a634e2f127168c_normal.png";
			c.title = "Hello World";
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
			google.maps.event.addDomListener(window, 'resize', function(){
				o.map.resize();
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
	        longitude : info[i]['longitude'],
	        is_share : info[i]['is_share'],
	        is_give : info[i]['is_give'],
	        is_kudos : info[i]['is_kudos'],
	        is_volunteer : info[i]['is_volunteer'],
	        country : info[i]['country'],
	        tweet_url : info[i]['tweet_url'],
	        action_url : info[i]['action_url']
	        // action : info[i]['action']; 
		    }

		    var locations = [[34.0500, -118.2500 ], [40.6700, -73.9400], [51.5072, 0.1275], [45.4667,  9.1833]]
		    var location = locations[Math.floor(Math.random()*locations.length)];
		    
	      if (chime.longitude === null) {
	        chime.latitude = location[1];
	        chime.longitude = location[0];
	      }

	      // console.log(chime);
				o.map.createMarker(chime);
		    o.chimes.push(chime);
   	  }

			o.map.createTicker(o.chimes);
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
