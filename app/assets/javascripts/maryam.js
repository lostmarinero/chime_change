var map, geocoder, marker, location,
	ey, my, mouseDown = false;
	
var o = {
	init: function(){
		this.map.init();
		
	},
    map: {
		size: function(){
			var w = 300,
				h = 100;
			return { width: w, height: h }
		},
		createTicker: function (chimes) {
		if (!chimes) {
			console.log("return..no chimes");
		}
		
		var html="<ul>";
		  for(var i=0; i<chimes.length; i++) {
		    var c= chimes[i];
			  var button = "";
			  button += c.isGive ? "<button class='btnGive'>Give</button>" : "";
			  button += c.isHelp ? "<button class='btnHelp'>Help</button>" :"";
			  button += "<button class='btnHelp'>Kudos</button>";
			  button += "<button class='btnHelp'>Share</button>";
			  html+="<li class='ticker_item'><span>" + c.tweet_text + "</span>" + button + "</li>";
			}
			html +="</ul>"
			$('#tweet_data').empty();
		    $('#tweet_data').append($(html));
		    $('#tweet_data').vTicker('init', {padding:4});
		    $('.btnGive').click(function() {
		     window.location.href = "www.paypal.com";
		    });
		    $('.btnHelp').click(function() {
		     window.location.href = "www.google.com/volunteer";
		    });
		    $('btnKudos').click(function() {
		     window.location.href = "https://twitter.com/intent/tweet?button_hashtag=ChimeHack&text=My%20story%20is%20about%20Kudos";
		    });
		    $('btnShare').click(function() {
		     window.location.href = "https://twitter.com/intent/tweet?button_hashtag=ChimeHack&text=Share";
		    });
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
			c.tweet_text="Hello World";
			c.isHelp = true;
			c.isGive = true;
			var chimes=[];
			chimes[0] = c;
			c.tweet_text = "anothr tweet";
			chimes[1] = c;
			this.createMarker(c);
			this.createTicker(chimes);
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

}

$(function(){ o.init(); 
  
  });

