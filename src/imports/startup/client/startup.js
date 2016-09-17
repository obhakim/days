import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import { TAPi18n } from 'meteor/tap:i18n';

FlowRouter.wait();

Meteor.startup(() => {
  Tracker.autorun(() => {
    // if the roles subscription is ready, start routing
    // there are specific cases that this reruns, so we also check
    // that FlowRouter hasn't initalized already
    if (Roles.subscription.ready() && !FlowRouter._initialized) {
      FlowRouter.initialize();
    }
  });

  function getUserLanguage() {
    const language = window.navigator.userLanguage || window.navigator.language;
    return language;
  }

  TAPi18n.setLanguage(getUserLanguage());
  BlazeLayout.setRoot('body');
});
