function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8567, lng: 2.3508},
    zoom: 13
  });
  
  var startInput = /** @type {!HTMLInputElement} */(
    document.getElementById('text-start'));
  var endInput = /** @type {!HTMLInputElement} */(
    document.getElementById('text-end'));
  var calculateButton = /** @type {!HTMLInputElement} */(
    document.getElementById('btn-calculate'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(startInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(endInput);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(calculateButton);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  var endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);

  var startMarker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  startAutocomplete.addListener('place_changed', function() {
    //infowindow.close();
    startMarker.setVisible(false);
    var place = startAutocomplete.getPlace();
    if (!place.geometry) {
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
    startMarker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    startMarker.setPosition(place.geometry.location);
    startMarker.setVisible(true);
  });
  
  
  var endMarker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  
  endAutocomplete.addListener('place_changed', function() {
    endMarker.setVisible(false);
    var place = endAutocomplete.getPlace();
    if (!place.geometry) {
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
    
    endMarker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    endMarker.setPosition(place.geometry.location);
    endMarker.setVisible(true);
  });
  /*
  var popup = $('#popup-modal');
  popup.magnificPopup({
		type: 'inline',
		preloader: false,
		modal: true
	});
	
	var popupDismiss = document.getElementById('popup-modal-dismiss');
	popupDismiss.addEventListener("click", function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
  */
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  
  calculateButton.addEventListener("click", function() {
    //calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    //endMarker.setVisible(false);
    //startMarker.setVisible(false);
    var popup = $('#popup-modal');
    $.magnificPopup.open({
        items: {
            src: popup,
            type: 'inline'
        },
        closeBtnInside: true

        // You may add options here, they're exactly the same as for $.fn.magnificPopup call
        // Note that some settings that rely on click event (like disableOn or midClick) will not work here
    }, 0);
  });
  
  directionsDisplay.addListener('directions_changed', function() {
    var total = computeTotalDistance(directionsDisplay.getDirections());
    /*
    $.magnificPopup.open({
        items: {
            src: 'someimage.jpg'
        },
        type: 'image'

        // You may add options here, they're exactly the same as for $.fn.magnificPopup call
        // Note that some settings that rely on click event (like disableOn or midClick) will not work here
    }, 0);
    */
  });
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