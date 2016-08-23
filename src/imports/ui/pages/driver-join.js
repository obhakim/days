import './driver-join.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { moment } from 'meteor/momentjs:moment';

Template.DriverJoin.helpers({
  validThruM() {
    const monthsList = [];
    for (let i = 1; i <= 12; i++) {
      monthsList.push({
        value: i,
      });
    }
    return monthsList;
  },
  validThruY() {
    const thisYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = 0; i < 5; i++) {
      yearsList.push({
        value: thisYear + i,
      });
    }
    return yearsList;
  },
  profile() {
    return Meteor.user().profile;
  },
});

Template.DriverJoin.events({
  'submit #form': function driverJoinSubmitForm(event) {
    // Prevent default browser form submit
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      profile: {
        lastName: event.target.lastname.value,
        firstName: event.target.firstname.value,
        phone: event.target.phone.value,
        birthday: moment(event.target.birthday.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
        street: event.target.street.value,
        city: event.target.city.value,
        zipcode: event.target.zipcode.value,
        creditCard: {
          num: event.target.num.value,
          validThruM: Number(event.target.validThruM.value),
          validThruY: Number(event.target.validThruY.value),
          cvv: event.target.cvv.value,
          name: event.target.name.value,
        },
      },
    };
    if ($('#terms').is(':checked')) {
      Meteor.call('createDriver', data, (error) => {
        if (error) {
          Session.set(SESSION.ERROR, error);
          /* const context = Meteor.users.simpleSchema().namedContext('createDriver');
           const errors = context.invalidKeys().map(function (keys) {
             return {
               message: context.keyErrorMessage(keys.name),
             };
           });
           Session.set(SESSION.VALIDATION_ERRORS, errors); */
        } else {
          FlowRouter.go('/s/driver/company'); // TODO : replace with redirection by root name
        }
      });
    } else {
      const error = { error: 400, reason: "Vous devez accepter les Conditions Générales d'utilisation" };
      Session.set(SESSION.ERROR, error);
      console.log(Session.get(SESSION.ERROR));
    }
    return false;
  },
});

Template.DriverJoin.onRendered(function driverJoinOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    // format: CONST.DEFAULT_DATETIME_FORMAT,
    format: CONST.DEFAULT_DATE_FORMAT,
    // useCurrent: true,
    locale: CONST.DEFAULT_LOCALE,
    // stepping: 5,
    // showTodayButton: true,
    // inline: true,
    // sideBySide: true,
  });
});
