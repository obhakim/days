import './reservation-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';

Template.ReservationItem.helpers({
  isAcceptable: () =>
    this.status < CONST.RESERVATION_STATUSES.ACCEPTED && Helpers.isDriverOrAdmin(),

  isConfirmable: () =>
    this.status < CONST.RESERVATION_STATUSES.CONFIRMED && Helpers.isDriverOrAdmin(),

  isCancelable: () =>
    this.ownerId === Meteor.userId() && Helpers.isAdmin(),
});

Template.ReservationItem.events({
  'click .acceptReservation': () => {
    Meteor.call('acceptReservation', this._id, Meteor.userId(), (error, result) => {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
  'click .confirmReservation': () => {
    Meteor.call('confirmReservation', this._id, (error, result) => {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
  'click .cancelReservation': () => {
    Meteor.call('cancelReservation', this._id, (error, result) => {
      if (error) {
        // show error
        Session.set(SESSION.ERROR, error);
      }
    });
  },
});
