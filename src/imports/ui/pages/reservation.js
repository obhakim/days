import './reservation.html';
import '../components/error-message.js';
import '../components/validation-errors.js';

import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Geolocation } from 'meteor/mdg:geolocation';
import { Reservations } from '../../api/reservations/methods.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { moment } from 'meteor/momentjs:moment';

let address = '';
let currentPosition = {};

function getCurrentPosition(selector) {
  navigator.geolocation.getCurrentPosition((position) => {
    currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(currentPosition);
    address = latLng.toString();

    geocoder.geocode({ latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        address = results[0].formatted_address;
        selector.val(address);
        // console.log(currentPosition);
      } else {
        // console.log(`Geocoding failed: ${status}`);
        // TODO : encode latLng somehow to identify it in function calculateRoute()
        selector.val(latLng);
      }
    });
  }, (error) => {
    // console.log(`Geocoding failed: ${error}`);
    // TODO : fix. Not displaying error correctly
    Session.set(SESSION.ERROR, {
      error: 'Erreur',
      reason: 'On n\'a pas pu vous localizer',
    });
  }, {
    timeout: 30000,
    enableHighAccuracy: true,
    maximumAge: 600000,
  });
}

function calculateAndDisplayRoute(
  directionsService, directionsDisplay, origin, destination, departureTime) {
  // console.log('{calculateAndDisplayRoute} origin=' + origin)
  // console.log('{calculateAndDisplayRoute} destination=' + destination)
  // console.log('{calculateAndDisplayRoute} departureTime=' + departureTime)
  if (origin && destination) {
    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime,
        // trafficModel: google.maps.TrafficModel.PESSIMISTIC
      },
      // unitSystem: UnitSystem.METRIC
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        Session.set(SESSION.ERROR, null);
        directionsDisplay.setDirections(response);
      } else {
        // window.alert('Directions request failed due to ' + status)
        Session.set(SESSION.ERROR, {
          error: 'Erreur',
          reason: 'Aucun itineraire n\'as pas été trouvé',
        });
      }
    });
  }
}

function getRoute(directionsResult) {
  let distance = 0;
  let duration = 0;
  const myroute = directionsResult.routes[0];

  for (let i = 0; i < myroute.legs.length; i++) {
    distance += myroute.legs[i].distance.value;
    duration += (myroute.legs[i].duration_in_traffic || myroute.legs[i].duration).value;
  }
  distance = distance / 1000;
  duration = duration / 60; // in minutes

  return {
    distance,
    duration,
  };
}


Template.Reservation.onCreated(function ReservationCreated() {
  // instance = Template.instance()
  // instance.errors = new ReactiveDict()
  const self = this;

  self.autorun(() => {
    self.subscribe('vehicletypes');
    self.subscribe('reservations.list');
    Session.set(SESSION.VALIDATION_ERRORS, null);
    // Session.set(SESSION.GEO_POSITION, Geolocation.latLng());
    // self.myPosition = Geolocation.latLng()
  });
});


function calculateAndDisplayRoute(
  directionsService, directionsDisplay, origin, destination, departureTime) {
  // console.log('{calculateAndDisplayRoute} origin=' + origin)
  // console.log('{calculateAndDisplayRoute} destination=' + destination)
  // console.log('{calculateAndDisplayRoute} departureTime=' + departureTime)
  if (origin && destination) {
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: departureTime,
        // trafficModel: google.maps.TrafficModel.PESSIMISTIC
      },
      // unitSystem: UnitSystem.METRIC
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        Session.set(SESSION.ERROR, null);
        directionsDisplay.setDirections(response);
      } else {
        // window.alert('Directions request failed due to ' + status)
        Session.set(SESSION.ERROR, {
          error: 'Erreur',
          reason: 'Aucun itineraire n\'as pas été trouvé',
        });
      }
    });
  }
}

function getRoute(directionsResult) {
  let distance = 0;
  let duration = 0;
  const myroute = directionsResult.routes[0];

  for (let i = 0; i < myroute.legs.length; i++) {
    distance += myroute.legs[i].distance.value;
    duration += (myroute.legs[i].duration_in_traffic || myroute.legs[i].duration).value;
  }
  distance = distance / 1000;
  duration = duration / 60; // in minutes

  return {
    distance,
    duration,
  };
}

Template.Reservation.helpers({
  // TODO : fix this as we not save current position to session any more
  // currentPositionNotDefined: () => !Session.get(SESSION.GEO_POSITION),
  currentPositionNotDefined: () => !currentPosition,
  vehicleTypesList: () => VehicleTypes.find().fetch(),
  profile: () => ((Meteor.user() && Meteor.user().profile) ? Meteor.user().profile : {}),
  // errors: function () {
  //       return Session.get(SESSION.VALIDATION_ERRORS)
  //   }
  // errors: function (fieldName) {
  //     return instance.errors.get(fieldName)
  // }
});

Template.Reservation.events({
  'click #startMyPosition': (event) => {
    event.preventDefault();
    getCurrentPosition($('#start'));
    // const instance = Template.instance()
    // if (instance.myPosition)
    // if (Session.get(SESSION.GEO_POSITION))
    // instance.$('#start').val(currentPositionText)
    // $('#start').val(currentPositionText);
  },

  'click #endMyPosition': (event) => {
    event.preventDefault();
    getCurrentPosition($('#end'));
  },

  'submit #reservationForm': (event) => {
    // Prevent default browser form submit
    event.preventDefault();

    // Hide errors
    Session.set(SESSION.VALIDATION_ERRORS, null);

    // Loading
    $('#reservationForm').addClass('loading');
    // Session.set(SESSION.ISLOADING, true)

    const r = {
      contact: {
        lastname: event.target.lastname.value,
        firstname: event.target.firstname.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
      },
      ride: {
        start: event.target.start.value,  // TODO: save latLng object ?
        end: event.target.end.value,
        startAt: moment(event.target.startat.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
        distance: event.target.distance.value,
      },
      vehicleTypeId: event.target.vehicletype.value,
      comment: event.target.comment.value,
    };

    Meteor.call('createReservation', r, (err, res) => {
      $('#reservationForm').removeClass('loading');
      // Session.set(SESSION.ISLOADING, false)

      if (err) {
        if (err.error === 'validation-error') {
          const context = Reservations.simpleSchema().namedContext('createReservation');
          const errors = context.invalidKeys().map((data) => {
            return {
              message: context.keyErrorMessage(data.name),
            };
          });
          Session.set(SESSION.VALIDATION_ERRORS, errors);
        } else {
          Session.set(SESSION.VALIDATION_ERRORS, [{
            message: err.reason,
          }]);
        }
      } else {
        FlowRouter.go('/s/reservations');
      }
    });

    return false;
  },
});

Template.Reservation.onRendered(function ReservationRendered() {
  // Session.set(SESSION.ISLOADING, true)

  // $('#startat').val(moment().format(CONST.DEFAULT_DATETIME_FORMAT))

  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATETIME_FORMAT,
    useCurrent: true,
    locale: CONST.DEFAULT_LOCALE,
    stepping: 5,
    showTodayButton: true,
    // inline: true
    // sideBySide: true,
  });

  const map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 48.8567,
      lng: 2.3508,
    }, // Paris
    zoom: 13,
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  const startInput = /** @type {!HTMLInputElement} */ (document.getElementById('start'));
  const endInput = /** @type {!HTMLInputElement} */ (document.getElementById('end'));
  const startAtInput = /** @type {!HTMLInputElement} */ (document.getElementById('startat'));
  const vehicleType = /** @type {!HTMLInputElement} */ (document.getElementById('vehicletype'));
  const distance = /** @type {!HTMLInputElement} */ (document.getElementById('distance'));
  const totalDistance = /** @type {!HTMLElement} */ (document.getElementById('totaldistance'));
  const totalDuration = /** @type {!HTMLElement} */ (document.getElementById('totalduration'));
  const totalPrice = /** @type {!HTMLElement} */ (document.getElementById('price'));

  startAtInput.value = moment().format(CONST.DEFAULT_DATETIME_FORMAT);

  function updateRoute() {
    const selectedRoute = getRoute(directionsDisplay.getDirections());
    // Update distance
    distance.value = selectedRoute.distance.toFixed(2);
    totalDistance.innerText = '' + distance.value;

    totalDuration.innerText = '' + selectedRoute.duration.toFixed(2);
  }

  function updatePrice() {
    // const price = 0.00 //= distance.value * 2.2
    Meteor.call('getPrice', vehicleType.value, startAtInput.value, distance.value, (err, res) => {
      if (res) {
        totalPrice.innerText = '' + res.toFixed(2);
      } else {
        totalPrice.innerText = '0.00';
      }
    });

    // totalPrice.innerText = '' + price.toFixed(2)
  }

  function calculateRoute() {
    const start = /** @type {!HTMLInputElement} */ (document.getElementById('start'));
    const end = /** @type {!HTMLInputElement} */ (document.getElementById('end'));
    const startAt = /** @type {!HTMLInputElement} */ (document.getElementById('startat'));
    if (start.value && end.value) {
      Meteor.setTimeout(() => {
        const departureTime = moment(startAt.value, CONST.DEFAULT_DATETIME_FORMAT).toDate();
        calculateAndDisplayRoute(directionsService, directionsDisplay,
          (start.value === address) ? currentPosition : start.value,
          (end.value === address) ? currentPosition : end.value,
          // TODO : fix this
          // (startInput.value === currentPositionText) ? Session.get(SESSION.GEO_POSITION) : startInput.value,
          // (endInput.value === currentPositionText) ? Session.get(SESSION.GEO_POSITION) : endInput.value,
          // Detect encoded latLng value and parse them like following :
          // String[] latlong =  "-34.8799074,174.7565664".split(",");
          // double latitude = Double.parseDouble(latlong[0]);
          // double longitude = Double.parseDouble(latlong[1]);
          // startInput.value,
          // endInput.value,
          departureTime);
      }, 100);
    }
  }

  const startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  startInput.addEventListener('blur', () => {
    calculateRoute();
  });

  const endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);
  endInput.addEventListener('blur', () => {
    calculateRoute();
  });

  vehicleType.addEventListener('change', () => {
    updatePrice();
  });

  directionsDisplay.addListener('directions_changed', () => {
    updateRoute();
    updatePrice();
  });


  // Session.set(SESSION.ISLOADING, false)
});


// Call the Method
// Reservations.methods.insert.call(data, function (error, result) {
//     if (error) {
//         // if (error.error === 'validation-error') {
//         //     // Initialize error object
//         //     const errors = {
//         //         lastname: [],
//         //         firstname: [],
//         //         phone: [],
//         //         email: [],
//         //         start: [],
//         //         end: [],
//         //         startAt: [],
//         //         vehicleType: [],
//         //         global: []
//         //     }

//         //     // Go through validation errors returned from Method
//         //     error.details.forEach((fieldError) => {
//         //         // XXX i18n
//         //         if (errors[fieldError.name]) {
//         //             errors[fieldError.name].push(fieldError.type)
//         //         } else {
//         //             errors['global'].push(fieldError.name + ':' + fieldError.type)
//         //         }
//         //     })

//         //     // Update ReactiveDict, errors will show up in the UI
//         //     instance.errors.set(errors)
//         // }
//         //const context = Reservations.simpleSchema().namedContext('Reservations.methods.insert')
//         //const errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } })
//         const errors = error.details.map(function (fieldError) { 
//             return { 
//                 message: Reservations.simpleSchema().messageForError(fieldError.type, fieldError.name, null, fieldError.value)
//             } 
//         })
//         Session.set(SESSION.VALIDATION_ERRORS, errors)
//     }
//     else {
//         FlowRouter.go('/s/reservations')
//     }
// })
