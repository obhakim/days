<<<<<<< HEAD
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
=======
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Geolocation } from 'meteor/mdg:geolocation';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';

FlowRouter.wait();
Tracker.autorun(() => {
  // if the roles subscription is ready, start routing
  // there are specific cases that this reruns, so we also check
  // that FlowRouter hasn't initalized already
  if (Roles.subscription.ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  }
});

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
>>>>>>> refs/remotes/origin/master
