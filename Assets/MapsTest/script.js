"use strict" 

function initMap() {
  var self=this;
  var map,
      directionsService,
      directionsDisplay,
      startMarker,
      endMarker,
      startAutocomplete,
      endAutocomplete,
      startInput,
      endInput;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8567, lng: 2.3508},  // Paris
    zoom: 13
  });
  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  
  var directionsContainer = /** @type {!HTMLElement} */(
    document.getElementById('directions-container'));
  startInput = /** @type {!HTMLInputElement} */(
    document.getElementById('text-start'));
  endInput = /** @type {!HTMLInputElement} */(
    document.getElementById('text-end'));
  var calculateButton = /** @type {!HTMLInputElement} */(
    document.getElementById('btn-calculate'));
  var orderContainer = /** @type {!HTMLElement} */(
    document.getElementById('order-container'));

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(directionsContainer);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(startInput);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(endInput);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(calculateButton);

  startMarker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });      
  endMarker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  startAutocomplete.addListener('place_changed', autocompleteChanged(startMarker, startAutocomplete.getPlace()));
  
  endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);
  endAutocomplete.addListener('place_changed', autocompleteChanged(endMarker, endAutocomplete.getPlace()));
    
  calculateButton.addEventListener("click", function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    endMarker.setVisible(false);
    startMarker.setVisible(false);
  });
  
  directionsDisplay.addListener('directions_changed', function() {
    var total = computeTotalDistance(directionsDisplay.getDirections());
    // Update distance
    var totalDistance = /** @type {!HTMLElement} */(
    document.getElementById('total-distance'));
    totalDistance.innerText = total;
    // Update start & end
    // Show right panel
    orderContainer.className = '';
  });
  
  function autocompleteChanged(marker, place) {
    //infowindow.close();
    marker.setVisible(false);
    if (!place || !place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }
      
  function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
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
}

/*
var directionsModule = null;  
$(document).ready(function () {
    directionsModule = new DirectionsModule();
    //directionsModule.init();
});
//*/