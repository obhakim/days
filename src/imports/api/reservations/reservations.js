import {
  SimpleSchema,
} from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Reservations = new Mongo.Collection('reservations');

Reservations.Schema = new SimpleSchema({
  contact: {
    type: Schema.Contact,
  },
  ride: {
    type: Schema.Ride,
  },
  // vehicleType: {label: "Type de véhicule", type: Number, defaultValue: 0},
  //vehicleType: {label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes()},
  vehicleTypeId: {
    label: 'Type de véhicule',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  price: {
    label: 'Prix',
    type: Number,
    decimal: true,
    defaultValue: 0.00,
    min: 0,
  },
  driverId: {
    label: 'Chauffeur',
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  status: {
    label: 'Statut',
    type: Number,
    defaultValue: CONST.RESERVATION_STATUSES.CREATED,
  },
  ownerId: {
    label: 'Id Client',
    type: String,
    denyUpdate: true,
    autoValue: function autoValue() {
      if (this.isInsert) {
        return Meteor.userId() || 0;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Meteor.userId() || 0,
        };
      } else {
        this.unset();
      }
    },
  },
  ownerName: {
    label: 'Client',
    type: String,
    denyUpdate: true,
    autoValue: function() {
      // console.log('{SimpleSchema ownerName} username = '+Meteor.user().username)
      // console.log('{SimpleSchema ownerName} lastname = '+ this.field('lastname').value)
      if (this.isInsert) {
        return Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value
        };
      } else {
        this.unset();
      }
    },
  },
  createdAt: {
    label: 'Réservé le',
    type: Date,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset();
      }
    },
  },
});

Reservations.attachSchema(Reservations.Schema);

// function calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance) {
function calculatePrice(ratePerKm, rateMin, rateMultiplier, startAt, distance) {
  let price = ratePerKm * distance;
    // if in rush hour
  if ((6 < startAt && startAt < 9.5) || (17 < startAt && startAt < 19.5)) {
    price = price * rateMultiplier;
  }

  if (price < rateMin) {
    return rateMin;
  } else {
    return price;
  }
}