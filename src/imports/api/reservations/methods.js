import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Reservations } from './reservations.js';
import { VehicleTypes } from '../vehicle-types/vehicle-types.js';
import { CONST } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';
import { check } from 'meteor/check';

function getPrice(vehicleTypeId, startAt, distance) {
  // if (!Meteor.user() || !Meteor.user().profile) {
  //   throw new Meteor.Error('no-profile',
  //     "Vous devez completer votre profile avant d'effectuer cette action");
  // }

  try {
    const vehicleType = VehicleTypes.findOne(vehicleTypeId);
    return Reservations.calculatePrice(
      vehicleType.ratePerKm, vehicleType.rateMin, vehicleType.rateMultiplier, startAt, distance);
  } catch (ex) {
    // log
    throw new Meteor.Error('cannot-get-price', "Impossible d'obtenir le prix");
  }
}

function updateReservationStatus(reservationId, newStatus, contextName) {
  // Get reservation
  const r = Reservations.findOne(reservationId);
  if (!r) {
    throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
  }

  // Logged user
  if (!Reservations.isCancellable(r)) {
    throw new Meteor.Error('not-authorized',
      "Vous n'etes pas authorizes d'effectuer cette action");
  }

  Reservations.update(reservationId,
    { $set: { status: newStatus } },
    { validationContext: contextName });

  return r;
}

function notifyNewReservation(email) {
  check(email, String);

  const subject = 'Nouvelle reservation';
  const text = 'Bonjour,\r\n\r\nune nouvelle reservation est disponible.';

  Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
}

function notifyReservationConfirmation(email) {
  check(email, String);

  const subject = 'Reservation confirmée';
  const text = 'Bonjour,\r\n\r\nVotre reservation est confirmée.\r\n\r\nDays';

  Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
}

function notifyReservationDone(email) {
  check(email, String);

  const subject = 'Reservation effectuée';
  const text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';

  Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
}

function notifyReservationNotDone(email) {
  check(email, String);

  const subject = 'Reservation effectuée';
  const text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';

  Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
}

function notifyReservationCancellation(email) {
  check(email, String);

  const subject = 'Reservation annulée';
  const text = 'Bonjour,\r\n\r\nVotre reservation est annulée.\r\n\r\nDays';

  Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
}

Meteor.methods({
  getPrice,
  createReservation: function createReservation(reservation) {
    if (!Meteor.user() || !Meteor.user().profile) {
      throw new Meteor.Error('no-profile',
        "Vous devez completer votre profile avant d'effectuer cette action");
    }

    // if (!Meteor.user().profile.creditCard) {
    //   throw new Meteor.Error('no-card-info',
    //     "Vous devez ajouter l'information sur votre carte de paiement " +
    //     "dans votre profile avant d'effectuer cette action");
    // }

    reservation.ownerId = Meteor.userId();
    reservation.ownerName =
      Helpers.getFullName(Meteor.user().profile.firstName, Meteor.user().profile.lastName);
    reservation.createdAt = new Date;

    // TODO : REMOVE horrible temporary hack to handle not selected vehicleType
    try {
      reservation.estimatedPrice =
        getPrice(reservation.vehicleTypeId, reservation.ride.startAt, reservation.ride.distance);
    } catch (error) {
      // throw error;
      console.log(error);
    }

    const id = Reservations.insert(reservation, {
      validationContext: 'createReservation',
    });

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        _.each(Meteor.users.find({}, {
          fields: {
            emails: 1,
          },
        }).fetch(), function (user) {
          notifyNewReservation(user.emails[0].address);
        });
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return id;
  },
  assignReservationDriver: function assignReservationDriver(reservationId, driverId) {
    const r = Reservations.findOne(reservationId);
    if (!r) {
      throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
    }

    // Logged user
    if (!Reservations.isDriverAssignable(r)) {
      throw new Meteor.Error('not-authorized',
        "Vous n'etes pas authorizes d'effectuer cette action");
    }

    Reservations.update(reservationId,
      { $set: { driverId } },
      { validationContext: 'assignReservationDriver' });

    // TODO
    // if (Meteor.isServer) {
    //   this.unblock();
    //   // Send notification
    //   try {
    //     notifyAssignReservationDriver(r.contact.email);
    //   } catch (error) {
    //     // throw error;
    //     console.log(error);
    //   }
    // }

    return r._id;
  },
  cancelReservation: function cancelReservation(reservationId) {
    const r = updateReservationStatus(
      reservationId, CONST.RESERVATION_STATUSES.CANCELLED, 'cancelReservation');

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        notifyReservationCancellation(r.contact.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return r._id;
  },
  confirmReservation: function confirmReservation(reservationId) {
    const r = updateReservationStatus(
      reservationId, CONST.RESERVATION_STATUSES.CONFIRMED, 'confirmReservation');

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        notifyReservationConfirmation(r.contact.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return r._id;
  },
  setReservationDone: function setReservationDone(reservationId) {
    const r = updateReservationStatus(
      reservationId, CONST.RESERVATION_STATUSES.DONE, 'setReservationDone');

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        notifyReservationDone(r.contact.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return r._id;
  },
  setReservationNotDone: function setReservationNotDone(reservationId) {
    const r = updateReservationStatus(
      reservationId, CONST.RESERVATION_STATUSES.NOTDONE, 'setReservationNotDone');

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        notifyReservationNotDone(r.contact.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return r._id;
  },
});
