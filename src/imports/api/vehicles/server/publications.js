/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { Vehicles } from '../vehicles.js';

Meteor.publish('myVehicles', function publishVehicles() {
  return Vehicles.find({
    $or: [{ ownerId: this.userId }],
  });
});
