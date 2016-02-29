Meteor.subscribe("reservations");
Meteor.subscribe("vehicletypes");

// Template.reservation.onCreated(function () {
//     this.errors = new ReactiveDict();
// });

// Template.registerHelper('isChecked', function(value1, value2) {
//   return value1 === value2;
// })

Template.reservation.helpers({
    vehicletypeslist: function () {
        return VehicleTypes.find().fetch();
    }
    // errors(fieldName) {
    //     return this.errors.get(fieldName);
    // }
    // errors: function () {
    //     var context = Reservations.simpleSchema().namedContext('form');
    //     return context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } });
    // }
});

Template.reservation.events({
    "submit #reservationForm": function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        //const instance = Template.instance();

        const data = {
            start: event.target.start.value,
            end: event.target.end.value,
            startAt: event.target.startat.value,
            vehicleType: event.target.vehicletype.value,
            //price: event.target.price.value
            //ownerId: Meteor.userId,
            //ownerName: Meteor.user().username || ''
        };
        
        //Reservations.insert(data);
        
        //Reservations.insert(data, {validationContext: 'insertForm'}, function(error, result) {
        Reservations.insert(data, { validationContext: 'form' }, function (error, result) {
            if (error) {
                var context = Reservations.simpleSchema().namedContext('form');
                var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } });
                Session.set('errors', errors);
            }
            else {
                FlowRouter.go('/s/reservations');
            }
        });

        return false;
      
        // Set the checked property to the opposite of its current value
        //Meteor.call("createReservation", this._id, data);
        //Meteor.call("createReservation", data);
    }
});

Template.reservation.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
        format: Meteor.App.DEFAULT_DATETIME_FORMAT,
        useCurrent: true,
        locale: Meteor.App.DEFAULT_LOCALE,
        stepping: 5,
        showTodayButton: true
        //,inline: true
        //sideBySide: true,
    });

    $('#startat').val(moment().format(Meteor.App.DEFAULT_DATETIME_FORMAT));

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

    directionsDisplay.addListener('directions_changed', function () {
        var total = computeTotalDistance(directionsDisplay.getDirections());
        // Update distance
        totalDistance.innerText = '' + total;
    });

});

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
    return total;
}