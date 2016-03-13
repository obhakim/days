Meteor.subscribe("vehicletypes");
Meteor.subscribe("reservations");
//var instance;

// Template.reservation.onCreated(function() {
//     instance = Template.instance();
//     instance.errors = new ReactiveDict();
// });

Template.reservation.helpers({
  vehicletypeslist: function() {
    return VehicleTypes.find().fetch();
  },
  // errors: function(fieldName) {
  //     return instance.errors.get(fieldName);
  // }
});

Template.reservation.events({
  "submit #reservationForm": function(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Hide errors
    //Session.set(SESSION.ERRORS, null);

    // Loading
    $('ui form').addClass('loading');

    const data = {
      lastname: event.target.lastname.value,
      firstname: event.target.firstname.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      start: event.target.start.value,
      end: event.target.end.value,
      startAt: moment(event.target.startat.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
      vehicleType: event.target.vehicletype.value,
    };

    // Reservations.insert(data, { validationContext: 'form' }, function (error, result) {
    //     if (error) {
    //         var context = Reservations.simpleSchema().namedContext('form');
    //         var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } });
    //         Session.set(SESSION.ERRORS, errors);
    //     }
    //     else {
    //         FlowRouter.go('/s/reservations');
    //     }
    // });

    // Call the Method
    // Reservations.methods.insert.call(data, function(error, result) {
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
    //         //     };

    //         //     // Go through validation errors returned from Method
    //         //     error.details.forEach((fieldError) => {
    //         //         // XXX i18n
    //         //         if (errors[fieldError.name]) {
    //         //             errors[fieldError.name].push(fieldError.type);
    //         //         } else {
    //         //             errors['global'].push(fieldError.name + ':' + fieldError.type);
    //         //         }
    //         //     });

    //         //     // Update ReactiveDict, errors will show up in the UI
    //         //     instance.errors.set(errors);
    //         // }
    //         //var context = Reservations.simpleSchema().namedContext('Reservations.methods.insert');
    //         //var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } });
    //         var errors = error.details.map(function (fieldError) { 
    //             return { 
    //                 message: Reservations.simpleSchema().messageForError(fieldError.type, fieldError.name, null, fieldError.value)
    //             } 
    //         });
    //         Session.set(SESSION.ERRORS, errors);
    //     }
    //     else {
    //         FlowRouter.go('/s/reservations');
    //     }
    // });
    //         Todos.methods.updateText.call({
    //         todoId: '12345',
    //         newText: 'This is a todo item.'
    //         }, (err, res) => {
    //         if (err) {
    //             alert(err);
    //         } else {
    //             // success!
    //         }
    //         });
    // 
    //         // Call the validation only
    //         Todos.methods.updateText.validate({ wrong: 'args'});
    // 
    //         // Call the Method with custom userId in a test
    //         Todos.methods.updateText.run.call({ userId: 'abcd' }, {
    //         todoId: '12345',
    //         newText: 'This is a todo item.'
    //         });

    Meteor.call("createReservation", data, function(error, result) {
      if (error) {
        var context = Reservations.simpleSchema().namedContext('createReservation');
        var errors = context.invalidKeys().map(function(data) { return { message: context.keyErrorMessage(data.name) } });
        Session.set(SESSION.ERRORS, errors);
      }
      else {
        FlowRouter.go('/s/reservations');
      }
    });

    $('ui form').removeClass('loading');

    return false;

    // Set the checked property to the opposite of its current value
    //Meteor.call("createReservation", this._id, data);
    //Meteor.call("createReservation", data);
  }
});

Template.reservation.onRendered(function() {
  $('#startat').val(moment().format(CONST.DEFAULT_DATETIME_FORMAT));

  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATETIME_FORMAT,
    useCurrent: true,
    locale: CONST.DEFAULT_LOCALE,
    stepping: 5,
    showTodayButton: true,
    //inline: true
    //sideBySide: true,
  });

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8567, lng: 2.3508 },  // Paris
    zoom: 13
  });

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  var startInput = /** @type {!HTMLInputElement} */(
    document.getElementById('start'));
  var endInput = /** @type {!HTMLInputElement} */(
    document.getElementById('end'));
  var totalDistance = /** @type {!HTMLElement} */(
    document.getElementById('totaldistance'));

  var startAutocomplete = new google.maps.places.Autocomplete(startInput);
  startAutocomplete.bindTo('bounds', map);
  startInput.addEventListener('blur', function() {
    if (endInput.value) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    }
  });

  var endAutocomplete = new google.maps.places.Autocomplete(endInput);
  endAutocomplete.bindTo('bounds', map);
  endInput.addEventListener('blur', function() {
    if (startInput.value) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startInput.value, endInput.value);
    }
  });

  directionsDisplay.addListener('directions_changed', function() {
    var total = computeTotalDistance(directionsDisplay.getDirections());
    // Update distance
    totalDistance.innerText = '' + total;
  });

});

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  console.log('{calculateAndDisplayRoute} origin=' + origin);
  console.log('{calculateAndDisplayRoute} destination=' + destination);
  if (origin && destination) {
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
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  return total;
}