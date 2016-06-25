import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

Meteor.startup(() => {
  Tracker.autorun(() => {
    // Potentially prompts the user to enable location services. We do this early
    // on in order to have the most accurate location by the time the user shares
    // var pos = Geolocation.currentLocation()
    const pos = Geolocation.latLng();
    // if (!pos) {
    //   console.log('Geolocation error : ' + Geolocation.error());
    // }
    Session.set(SESSION.GEO_POSITION, pos);
  });

  // Accounts.ui.config({
  //     passwordSignupFields: 'USERNAME_AND_EMAIL'
  // })
  BlazeLayout.setRoot('body');
});
