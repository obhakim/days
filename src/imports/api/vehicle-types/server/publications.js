/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { VehicleTypes } from '../vehicle-types.js';

Meteor.publish('vehicletypes', function vehicletypes() {
  return VehicleTypes.find();
});


