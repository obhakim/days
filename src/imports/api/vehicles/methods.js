import { Meteor } from 'meteor/meteor';
import { Vehicles } from './vehicles.js';

// import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  addVehicle: (vehicle) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    vehicle.ownerId = Meteor.userId();

    return Vehicles.insert(vehicle);
  },

  updateVehicle: (vehicleId, vehicle) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    vehicle.ownerId = Meteor.userId();

    return Vehicles.update(vehicleId, {
      $set: vehicle,
    });
  },

  removeVehicle: (vehicleId) => {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    const R = Vehicles.findOne(vehicleId);
    if (!R) {
      throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");
    }
    // Only accepted may be confirmed
    if (R.ownerId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Vehicles.remove(vehicleId);
  },

});
