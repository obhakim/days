import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Reservations } from './reservations.js';
import { VehicleTypes } from '../vehicle-types/vehicle-types.js';
import { CONST } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';


function getPrice(vehicleTypeId, startAt, distance) {
  try {
    const vehicleType = VehicleTypes.findOne(vehicleTypeId);
    return Reservations.calculatePrice(
      vehicleType.ratePerKm, vehicleType.rateMin, vehicleType.rateMultiplier, startAt, distance);
  } catch (ex) {
    // log
    throw new Meteor.Error('cannot-get-price', "Impossible d'obtenir le prix");
  }
}

Meteor.methods({
  getPrice,
  createReservation: function createReservation(reservation) {
    if (!Meteor.user() || !Meteor.user().profile) {
      throw new Meteor.Error('no-profile', "Vous devez completer votre profile avant d'effectuer cette action");
    }

    reservation.ownerId = Meteor.userId();
    reservation.ownerName = Helpers.getFullName(
      Meteor.user().profile.firstName, Meteor.user().profile.lastName);
    reservation.createdAt = new Date;

    try { // TODO : REMOVE horrible temporary hack to handle not selected vehicleType
      reservation.price = getPrice(
        reservation.vehicleTypeId, reservation.ride.startAt, reservation.ride.distance);
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
          Helpers.notifyNewReservation(user.emails[0].address);
        });
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return id;
  },
  acceptReservation: function (reservationId, userId) {
    // Logged user
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
    }

    // Driver or Admin only
    // Get reservation
    const r = Reservations.findOne(reservationId);
    if (!r) {
      throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
    }
    // Only created may be accepted
    if (r.status > CONST.RESERVATION_STATUSES.CREATED) {
      throw new Meteor.Error('not-applicable', "N'est pas applicable");
    }

    const id = Reservations.update(reservationId, {
      $set: {
        status: CONST.RESERVATION_STATUSES.ACCEPTED,
        driverId: userId, // Preparing "assign to driver"
      },
    }, {
      validationContext: 'acceptReservation',
    });

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        Helpers.notifyReservationAcceptance(r.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return id;
  },
  confirmReservation: function (reservationId, userId) {
    // Logged user
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized',
        "Vous n'etes pas authorizes d'effectuer cette action");
    }
    // Driver or Admin only
    // Get reservation
    const r = Reservations.findOne(reservationId);
    if (!r) {
      throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
    }
    // Only accepted may be confirmed
    if (r.status > CONST.RESERVATION_STATUSES.ACCEPTED) {
      throw new Meteor.Error('not-applicable', "N'est pas applicable");
    }

    const id = Reservations.update(reservationId, {
      $set: {
        status: CONST.RESERVATION_STATUSES.CONFIRMED,
      },
    }, {
      validationContext: 'confirmReservation',
    });

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        Helpers.notifyReservationConfirmation(r.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return id;
  },
  cancelReservation: function (reservationId, userId) {
    // Logged user
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
    }
    // Driver or Admin only
    // Get reservation
    const r = Reservations.findOne(reservationId);
    if (!r) {
      throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
    }

    const id = Reservations.update(reservationId, {
      $set: {
        status: CONST.RESERVATION_STATUSES.CANCELLED,
      },
    }, {
      validationContext: 'cancelReservation',
    });

    if (Meteor.isServer) {
      this.unblock();
      // Send notification
      try {
        Helpers.notifyReservationCancellation(r.email);
      } catch (error) {
        // throw error;
        console.log(error);
      }
    }

    return id;
  },
});
