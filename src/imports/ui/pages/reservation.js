import './reservation.html';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Reservations } from '../../api/reservations/methods.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { moment } from 'meteor/momentjs:moment';

import '../components/error-message.js';
import '../components/validation-errors.js';

// Meteor.subscribe("vehicletypes")
// Meteor.subscribe("reservations")
// const instance
const currentPositionText = 'Position actuelle';

Template.Reservation.onCreated(function () {
  // instance = Template.instance()
  // instance.errors = new ReactiveDict()
  const self = this;

  self.autorun(function () {
    self.subscribe('vehicletypes');
    self.subscribe('reservations');
    Session.set(SESSION.VALIDATION_ERRORS, null);
    Session.set(SESSION.GEO_POSITION, Geolocation.latLng());
  // self.myPosition = Geolocation.latLng()
  });
});

Template.Reservation.helpers({
  currentPositionNotDefined: function () {
    // return !Template.instance().myPosition
    return !Session.get(SESSION.GEO_POSITION);
  },
  vehicleTypesList: function () {
    return VehicleTypes.find().fetch();
  },
  profile: function () {
    return (Meteor.user() && Meteor.user().profile) ? Meteor.user().profile : {};
  },
// errors: function () {
//       return Session.get(SESSION.VALIDATION_ERRORS)
//   }
// errors: function (fieldName) {
//     return instance.errors.get(fieldName)
// }
});

Template.Reservation.events({
  'click #startMyPosition': function (event) {
    event.preventDefault();
    // const instance = Template.instance()
    // if (instance.myPosition)
    if (Session.get(SESSION.GEO_POSITION))
      // instance.$('#start').val(currentPositionText)
      $('#start').val(currentPositionText);
  },

  'click #endMyPosition': function (event) {
    event.preventDefault();
    // const instance = Template.instance()
    // if (instance.myPosition)
    if (Session.get(SESSION.GEO_POSITION))
      // instance.$('#end').val(currentPositionText)
      $('#end').val(currentPositionText);
  },

  'submit #reservationForm': function (event) {
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
        start: event.target.start.value,
        end: event.target.end.value,
        startAt: moment(event.target.startat.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
        distance: event.target.distance.value,
      },
      vehicleTypeId: event.target.vehicletype.value,
    };

    Meteor.call('createReservation', r, function (err, res) {
      $('#reservationForm').removeClass('loading');
      // Session.set(SESSION.ISLOADING, false)

      if (err) {
        if (err.error === 'validation-error') {
          const context = Reservations.simpleSchema().namedContext('createReservation');
          const errors = context.invalidKeys().map(function (data) {
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

Template.Reservation.onRendered(function () {
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
  const startAt = /** @type {!HTMLInputElement} */ (document.getElementById('startat'));
  const vehicleType = /** @type {!HTMLInputElement} */ (document.getElementById('vehicletype'));
  const distance = /** @type {!HTMLInputElement} */ (document.getElementById('distance'));
  const totalDistance = /** @type {!HTMLElement} */ (document.getElementById('totaldistance'));
  const totalDuration = /** @type {!HTMLElement} */ (document.getElementById('totalduration'));
  const totalPrice = /** @type {!HTMLElement} */ (document.getElementById('price'));

  startAt.value = moment().format(CONST.DEFAULT_DATETIME_FORMAT);

  const startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  startInput.addEventListener('blur', function () {
    calculateRoute();
  });

  const endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);
  endInput.addEventListener('blur', function () {
    calculateRoute();
  });

  vehicleType.addEventListener('change', function () {
    updatePrice();
  });

  directionsDisplay.addListener('directions_changed', function () {
    updateRoute();
    updatePrice();
  });

  function updateRoute() {
    const selectedRoute = getRoute(directionsDisplay.getDirections());
    // Update distance
    distance.value = selectedRoute.distance.toFixed(2);
    totalDistance.innerText = '' + distance.value;

    totalDuration.innerText = '' + selectedRoute.duration.toFixed(2);
  }

  function updatePrice() {
    // const price = 0.00 //= distance.value * 2.2
    Meteor.call('getPrice', vehicleType.value, startAt.value, distance.value, function (err, res) {
      if (res) {
        totalPrice.innerText = '' + res.toFixed(2);
      } else {
        totalPrice.innerText = '0.00';
      }
    });

  // totalPrice.innerText = '' + price.toFixed(2)
  }

  function calculateRoute() {
    const startInput = /** @type {!HTMLInputElement} */ (document.getElementById('start'));
    const endInput = /** @type {!HTMLInputElement} */ (document.getElementById('end'));
    if (startInput.value && endInput.value) {
      Meteor.setTimeout(function () {
        const departureTime = moment(document.getElementById('startat').value, CONST.DEFAULT_DATETIME_FORMAT).toDate();
        calculateAndDisplayRoute(directionsService, directionsDisplay,
          (startInput.value === currentPositionText) ? Session.get(SESSION.GEO_POSITION) : startInput.value,
          (endInput.value === currentPositionText) ? Session.get(SESSION.GEO_POSITION) : endInput.value,
          departureTime);
      }, 100);
    }
  }

// Session.set(SESSION.ISLOADING, false)
});

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination, departureTime) {
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
    }, function (response, status) {
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
