import './reservation-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';
import { Roles } from 'meteor/alanning:roles';

Template.ReservationItem.helpers({
  // reservations: function () {
  //     return Reservations.find()
  // }
  isAcceptable: function () {
    return this.status < CONST.RESERVATION_STATUSES.ACCEPTED && Helpers.isDriverOrAdmin();
  },
  isConfirmable: function () {
    return this.status < CONST.RESERVATION_STATUSES.CONFIRMED && Helpers.isDriverOrAdmin();
  },
  isCancelable: function () {
    return this.ownerId === Meteor.userId() && Helpers.isAdmin();
  },
});

Template.ReservationItem.events({
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
