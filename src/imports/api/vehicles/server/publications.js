/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Vehicles } from '../vehicles.js';

Meteor.publish('vehicles', function publishVehicles() {
  return Vehicles.find(); // Todo filter by current user
});
