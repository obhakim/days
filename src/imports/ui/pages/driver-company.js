import './driver-company.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';

Template.DriverCompany.helpers({
});

Template.DriverCompany.events({
  'submit #form': function driverJoinSubmitForm(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const data = {
      field: event.target.field.value,
    };

    // TODO: Add validation

    Meteor.call('METHOD', data, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
        FlowRouter.go('/s/driver/vehicles'); // TODO : replace with redirection by root name
      }
    });

    return false;
  },
});

Template.DriverCompany.onRendered(() => {
});
