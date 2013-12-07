var map, geocoder, marker, location,
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
		  var center = new google.maps.LatLng(52, 52); //default
		  navigator.geolocation.getCurrentPosition(function() {
		     center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		   });
		   return {
				zoom: 3,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: center
			};
		},

        // Drops a Pin
	    createMarker: function(chime) {
		  var marker =  new google.maps.Marker(
		    {icon: chime.img, map: map, title: chime.screen_name, position: new google.maps.LatLng(chime.longitude, chime.latitude)});
			
		  google.maps.event.addListener(marker, 'click', function(){
			  alert("hello world");
			// this is where the click handler will go
		  }); 
		  return marker;
		},
		
		show: function(){
			var c = new Object();
			c.screen_name = "Maryam";
			c.img = "";
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

}

$(function(){ o.init(); });

