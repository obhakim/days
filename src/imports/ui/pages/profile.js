import './profile.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { moment } from 'meteor/momentjs:moment';

// import {
//   updateProfile,
// } from '../../api/users/methods.js';

import '../lib/helpers.js';
import '../components/validation-errors.js';

Template.Profile.helpers({
  validThruM: function () {
    const monthsList = [];
    for (let i = 1; i <= 12; i++) {
      monthsList.push({
        value: i,
      });
    }
    return monthsList;
  },
  validThruY: function () {
    const thisYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = 0; i < 5; i++) {
      yearsList.push({
        value: thisYear + i,
      });
    }
    return yearsList;
  },
  profile: function () {
    return Meteor.user().profile;
  },
});

Template.Profile.events({
  'submit #form': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    const data = {
      lastName: event.target.lastname.value,
      firstName: event.target.firstname.value,
      phone: event.target.phone.value,
      // email: event.target.email.value,
      birthday: moment(event.target.birthday.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
      creditCard: {
        num: event.target.num.value,
        validThruM: event.target.validThruM.value,
        validThruY: event.target.validThruY.value,
        cvv: event.target.cvv.value,
        name: event.target.name.value,
      },
    };

    // updateProfile.call(data, (error) => {
    //   if (error) {
    //     const context = Meteor.users.simpleSchema().namedContext('updateUserProfile');
    //     const errors = context.invalidKeys().map(function (d) {
    //       return {
    //         message: context.keyErrorMessage(d.name),
    //       };
    //     });
    //     Session.set(SESSION.VALIDATION_ERRORS, errors);
    //   } else {
    //     FlowRouter.go('/');
    //   }
    // });

    Meteor.call('updateUserProfile', data, function (error, result) {
      if (error) {
        let context = Meteor.users.simpleSchema().namedContext('updateUserProfile');
        let errors = context.invalidKeys().map(function (data) {
          return {
            message: context.keyErrorMessage(data.name),
          };
        });
        Session.set(SESSION.VALIDATION_ERRORS, errors);
      } else {
        FlowRouter.go('/');
      }
    });

    return false;
  },
});

Template.Profile.onRendered(function () {
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
