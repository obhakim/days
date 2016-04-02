Meteor.startup(function () {
  Tracker.autorun(function () {
    // Potentially prompts the user to enable location services. We do this early
    // on in order to have the most accurate location by the time the user shares
    // var pos = Geolocation.currentLocation()
    var pos = Geolocation.latLng()
    if (!pos) {
      console.log('Geolocation error : ' + Geolocation.error())
    }
    Session.set(SESSION.GEO_POSITION, pos)
  })

  // Accounts.ui.config({
  //     passwordSignupFields: 'USERNAME_AND_EMAIL'
  // })
  BlazeLayout.setRoot('body')
})
