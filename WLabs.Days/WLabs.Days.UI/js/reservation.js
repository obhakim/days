/* global google */
"use strict";

(function reservation() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8567, lng: 2.3508 },  // Paris
    zoom: 13
  });

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var startInput = /** @type {!HTMLInputElement} */(
    document.getElementById('start80'));
  var endInput = /** @type {!HTMLInputElement} */(
    document.getElementById('destination78'));

  var startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  startInput.addEventListener('blur', function () {
    if (endInput.value) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    }
  });

  var endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);
  endInput.addEventListener('blur', function () {
    if (startInput.value) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    }
  });

  $.datetimepicker.setLocale('fr');
  //$('#datetime-from').datetimepicker({ mask: true });
	//$('#datetime-to').datetimepicker({ mask: true });

  $('#startat79').datetimepicker({ mask: true });
  var now = new Date();
  $('#startat79').val(now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes());

  //directionsDisplay.addListener('directions_changed', function () {
  //  var total = computeTotalDistance(directionsDisplay.getDirections());
  //  // Update distance
  //  var totalDistance = /** @type {!HTMLElement} */(
  //    document.getElementById('total-distance'));
  //  totalDistance.innerText = '' + total;
  //  // Update start & end
  //  var labelFrom = /** @type {!HTMLElement} */(
  //    document.getElementById('label-from'));
  //  labelFrom.innerText = startInput.value;

  //  var labelTo = /** @type {!HTMLElement} */(
  //    document.getElementById('label-to'));
  //  labelTo.innerText = endInput.value;
    
  //  // jQuery('#datetime-from').datetimepicker({
  //  //   allowTimes:[
  //  //     '12:00', '13:00', '15:00', 
  //  //     '17:00', '17:05', '17:20', '19:00', '20:00'
  //  //   ]
  //  // });
  //  // $('#datetime-from').datetimepicker({
  //  //   inline:true,
  //  // });

  //  // Show right panel
  //  // directionsContainer.className = 'hidden';
  //  // orderContainer.className = '';
  //});

//   function placeChanged(marker, place) {
//     //infowindow.close();
//     marker.setVisible(false);
//     if (!place || !place.geometry) {
//       window.alert("Autocomplete's returned place contains no geometry");
//       return;
//     }
// 
//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);  // Why 17? Because it looks good.
//     }
//     marker.setIcon(/** @type {google.maps.Icon} */({
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(35, 35)
//     }));
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//   }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  	if (origin && destination) {
  		directionsService.route({
  			origin: origin,
  			destination: destination,
  			travelMode: google.maps.TravelMode.DRIVING
  		}, function (response, status) {
  			if (status === google.maps.DirectionsStatus.OK) {
  				directionsDisplay.setDirections(response);
  			} else {
  				window.alert('Directions request failed due to ' + status);
  			}
  		});
  	}
  }

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    //document.getElementById('total').innerHTML = total + ' km';
    return total;
  }

})();



//google.maps.event.addDomListener(window, "load", initialize);

/*
var directionsModule = null;  
$(document).ready(function () {
    directionsModule = new DirectionsModule();
    directionsModule.init();
});
//*/