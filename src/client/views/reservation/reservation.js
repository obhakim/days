// Meteor.subscribe("vehicletypes")
// Meteor.subscribe("reservations")
// var instance
const currentPositionText = 'Position actuelle'

Template.reservation.onCreated(function () {
  // instance = Template.instance()
  // instance.errors = new ReactiveDict()
  var self = this

  self.autorun(function () {
    self.subscribe('vehicletypes')
    self.subscribe('reservations')
    Session.set(SESSION.VALIDATION_ERRORS, null)
    self.myPosition = Geolocation.latLng()
  })
})

Template.reservation.helpers({
  currentPositionNotDefined: function () {
    return !Template.instance().myPosition
  },
  vehicleTypesList: function () {
    return VehicleTypes.find().fetch()
  },
  profile: function () {
    var profile = Meteor.user().profile
    return profile ? profile : {}
  },
// errors: function () {
//       return Session.get(SESSION.VALIDATION_ERRORS)
//   }
// errors: function(fieldName) {
//     return instance.errors.get(fieldName)
// }
})

Template.reservation.events({
  'click #startMyPosition': function (event) {
    event.preventDefault()
    const instance = Template.instance()
    if (instance.myPosition)
      instance.$('#start').val(currentPositionText)
  },

  'click #endMyPosition': function (event) {
    event.preventDefault()
    const instance = Template.instance()
    if (instance.myPosition)
      instance.$('#end').val(currentPositionText)
  },

  'submit #reservationForm': function (event) {
    // Prevent default browser form submit
    event.preventDefault()

    // Hide errors
    Session.set(SESSION.VALIDATION_ERRORS, null)

    // Loading
    $('ui form').addClass('loading')
    // Session.set(SESSION.ISLOADING, true)

    const data = {
      lastname: event.target.lastname.value,
      firstname: event.target.firstname.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      start: event.target.start.value,
      end: event.target.end.value,
      startAt: moment(event.target.startat.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
      vehicleType: event.target.vehicletype.value,
    }

    Meteor.call('createReservation', data, function (err, res) {
      if (err) {
        if (err.error === 'validation-error') {
          var context = Reservations.simpleSchema().namedContext('createReservation')
          var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } })
          Session.set(SESSION.VALIDATION_ERRORS, errors)
        } else {
          Session.set(SESSION.VALIDATION_ERRORS, [{message: err.reason}])
        }
      } else {
        FlowRouter.go('/s/reservations')
      }
    })

    $('ui form').removeClass('loading')
    // Session.set(SESSION.ISLOADING, false)

    return false
  }
})

Template.reservation.onRendered(function () {
  // Session.set(SESSION.ISLOADING, true)

  $('#startat').val(moment().format(CONST.DEFAULT_DATETIME_FORMAT))

  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATETIME_FORMAT,
    useCurrent: true,
    locale: CONST.DEFAULT_LOCALE,
    stepping: 5,
    showTodayButton: true,
  // inline: true
  // sideBySide: true,
  })

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8567, lng: 2.3508 }, // Paris
    zoom: 13
  })

  var directionsService = new google.maps.DirectionsService()
  var directionsDisplay = new google.maps.DirectionsRenderer()
  directionsDisplay.setMap(map)

  var startInput = /** @type {!HTMLInputElement} */ (document.getElementById('start'))
  var endInput = /** @type {!HTMLInputElement} */ (document.getElementById('end'))
  var totalDistance = /** @type {!HTMLElement} */ (document.getElementById('totaldistance'))
  var totalPrice = /** @type {!HTMLElement} */ (document.getElementById('price'))

  var startAutocomplete = new google.maps.places.Autocomplete(startInput)
  startAutocomplete.bindTo('bounds', map)
  startInput.addEventListener('blur', function () {
    if (endInput.value) {
      Meteor.setTimeout(function () {
				var departureTime = moment(document.getElementById('startat').value, CONST.DEFAULT_DATETIME_FORMAT).toDate()
        calculateAndDisplayRoute(directionsService, directionsDisplay,
          (startInput.value == currentPositionText) ? this.myPosition : startInput.value,
          (endInput.value == currentPositionText) ? this.myPosition : endInput.value)
      }, 100)
    }
  })

  var endAutocomplete = new google.maps.places.Autocomplete(endInput)
  endAutocomplete.bindTo('bounds', map)
  endInput.addEventListener('blur', function () {
    if (startInput.value) {
      Meteor.setTimeout(function () {
				var departureTime = moment(document.getElementById('startat').value, CONST.DEFAULT_DATETIME_FORMAT).toDate()
        calculateAndDisplayRoute(directionsService, directionsDisplay,
          (startInput.value == currentPositionText) ? this.myPosition : startInput.value,
          (endInput.value == currentPositionText) ? this.myPosition : endInput.value)
      }, 100)
    }
  })

  directionsDisplay.addListener('directions_changed', function () {
    var total = computeTotalDistance(directionsDisplay.getDirections())
    var price = computeTotalPrice(total, 2.2)
    // Update distance
    totalDistance.innerText = '' + total.toFixed(2)
    totalPrice.innerText = '' + price.toFixed(2)
  })

// Session.set(SESSION.ISLOADING, false)
})

function calculateAndDisplayRoute (directionsService, directionsDisplay, origin, destination, departureTime) {
  // console.log('{calculateAndDisplayRoute} origin=' + origin)
  // console.log('{calculateAndDisplayRoute} destination=' + destination)
  if (origin && destination) {
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: departureTime,
        //trafficModel: google.maps.TrafficModel.PESSIMISTIC
      },
      //unitSystem: UnitSystem.METRIC
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status)
      }
    })
  }
}

function computeTotalDistance (result) {
  var total = 0
  var myroute = result.routes[0]
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value
  }
  total = total / 1000
  return total
}

function computeTotalPrice (totalDistance, rate) {
  var price = totalDistance * rate
  return price
}

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
//         //var context = Reservations.simpleSchema().namedContext('Reservations.methods.insert')
//         //var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } })
//         var errors = error.details.map(function (fieldError) { 
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
