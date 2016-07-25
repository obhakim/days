import { Meteor } from 'meteor/meteor';
import { Vehicles } from './vehicles.js';

// import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  addVehicle: (vehicle) => {

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Vehicles.insert(vehicle);
  },

  removeVehicle: (vehicleId) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Vehicles.remove(vehicleId);
  },

  updateVehicle: (vehicleId, vehicle) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Vehicles.update(vehicleId, {
      $set: vehicle,
    });
  },

});