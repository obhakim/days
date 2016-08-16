import './driver-company.html';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
// import { Meteor } from 'meteor/meteor';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { Session } from 'meteor/session';
// import { CONST, SESSION } from '../../common/constants.js';

Template.DriverCompany.helpers({
});

Template.DriverCompany.events({
  /* 'submit #form': function driverJoinSubmitForm(event) {
  Prevent default browser form submit
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
  },*/
  'click #textPc, click #buttonPc': (event) => {
    $('#filePc', $(event.target).parents()).click();
  },
  'click #textVld, click #buttonVld': (event) => {
    $('#fileVld', $(event.target).parents()).click();
  },
  'click #textKbs, click #buttonKbs': (event) => {
    $('#fileKbs', $(event.target).parents()).click();
  },
  'click #textEcj, click #buttonEcj': (event) => {
    $('#fileEcj', $(event.target).parents()).click();
  },
  'click #textArp, click #buttonArp': (event) => {
    $('#fileArp', $(event.target).parents()).click();
  },
  'click #textCv, click #buttonCv': (event) => {
    $('#fileCv', $(event.target).parents()).click();
  },
  'click #textAam, click #buttonAam': (event) => {
    $('#fileAam', $(event.target).parents()).click();
  },
  'change #filePc': (event) => {
    const name = event.target.files[0].name;
    $('#textPc', $(event.target).parent()).val(name);
  },
  'change #fileVld': (event) => {
    const name = event.target.files[0].name;
    $('#textVld', $(event.target).parent()).val(name);
  },
  'change #fileKbs': (event) => {
    const name = event.target.files[0].name;
    $('#textKbs', $(event.target).parent()).val(name);
  },
  'change #fileEcj': (event) => {
    const name = event.target.files[0].name;
    $('#textEcj', $(event.target).parent()).val(name);
  },
  'change #fileArp': (event) => {
    const name = event.target.files[0].name;
    $('#textArp', $(event.target).parent()).val(name);
  },
  'change #fileCv': (event) => {
    const name = event.target.files[0].name;
    $('#textCv', $(event.target).parent()).val(name);
  },
  'change #fileAam': (event) => {
    const name = event.target.files[0].name;
    $('#textAam', $(event.target).parent()).val(name);
  },
});

Template.DriverCompany.onRendered(() => {
});
