import './reservation-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';
import { Reservations } from '../../api/reservations/reservations.js';

Template.ReservationItem.helpers({
  isCancellable: function () {
    return Reservations.isCancellable(this);
  },
  isConfirmable: function () {
    return Reservations.isConfirmable(this);
  },
  isDriverAssignable: function () {
    return Reservations.isDriverAssignable(this);
  },
  isDoable: function () {
    return Reservations.isDoable(this);
  },
});

Template.ReservationItem.events({
  'click #cancelReservation': function () {
    Meteor.call('cancelReservation', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
  'change #driversList': function (e) {
    Meteor.call('assignDriver', this._id, e.value, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      } else {
        //
      }
    });
  },
  'click #confirmReservation': function () {
    Meteor.call('confirmReservation', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
  'click #setReservationDone': function () {
    Meteor.call('setReservationDone', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
  'click #setReservationNotDone': function () {
    Meteor.call('setReservationNotDone', this._id, function (error, result) {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      } else {
        //
      }
    });
  },
});
