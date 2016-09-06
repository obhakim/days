import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
// import { Geolocation } from 'meteor/mdg:geolocation';
// import { Session } from 'meteor/session';
// import { SESSION } from '../../common/constants.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
// import { Uploader } from 'meteor/tomi:upload-jquery';

FlowRouter.wait();

Meteor.startup(() => {
  Tracker.autorun(() => {
    // if the roles subscription is ready, start routing
    // there are specific cases that this reruns, so we also check
    // that FlowRouter hasn't initalized already
    if (Roles.subscription.ready() && !FlowRouter._initialized) {
      FlowRouter.initialize();
    }

    // Potentially prompts the user to enable location services. We do this early
    // on in order to have the most accurate location by the time the user shares
    // var pos = Geolocation.currentLocation()
    // const pos = Geolocation.latLng();
    // Session.set(SESSION.GEO_POSITION, pos);
    // Check how to manage geolocation better to make it faster by starting geolocation
    // on app start here and getting the coordinates later

    // Uploader.uploadUrl = Meteor.absoluteUrl('upload'); // Cordova needs absolute URL
  });

  getUserLanguage = function () {
    const language = window.navigator.userLanguage || window.navigator.language;
    return language;
  };
  
  TAPi18n.setLanguage(getUserLanguage())
    .done(function () {
      Session.set('showLoadingIndicator', false);
    })
    .fail(function (error_message) {
      console.log(error_message);
    });
  // Accounts.ui.config({
  //     passwordSignupFields: 'USERNAME_AND_EMAIL'
  // })
  BlazeLayout.setRoot('body');
});
