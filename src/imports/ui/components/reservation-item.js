import './reservation-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST } from '../../common/constants.js';
import { SESSION } from '../../startup/client/constants.js';
import { Roles } from 'meteor/alanning:roles';

Template.reservationItem.helpers({
  // reservations: function () {
  //     return Reservations.find()
  // }
  isAcceptable: function () {
    return this.status < CONST.RESERVATION_STATUSES.ACCEPTED;
  },
  isConfirmable: function () {
    return this.status < CONST.RESERVATION_STATUSES.CONFIRMED;
  },
  isCancelable: function () {
    return Roles.userIsInRole(Meteor.user(), [CONST.USER_ROLES.ADMIN]);
  },
});

Template.reservationItem.events({
  'click .acceptReservation': function () {
    Meteor.call('acceptReservation', this._id, Meteor.userId(), function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      } else {
        //
      }
    });
  },
  'click .confirmReservation': function () {
    Meteor.call('confirmReservation', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      } else {
        //
      }
    });
  },
  'click .cancelReservation': function () {
    Meteor.call('cancelReservation', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      } else {
        //
      }
    });
  },
});
