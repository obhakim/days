Meteor.startup(function () {
    // Potentially prompts the user to enable location services. We do this early
    // on in order to have the most accurate location by the time the user shares
    //Geolocation.currentLocation();
  
    // Accounts.ui.config({
    //     passwordSignupFields: 'USERNAME_AND_EMAIL'
    // });
    BlazeLayout.setRoot('body');
});