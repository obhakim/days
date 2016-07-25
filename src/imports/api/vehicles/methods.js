import { Meteor } from 'meteor/meteor';
import { Vehicles } from './vehicles.js';
import { _ } from 'meteor/underscore';
import { CONST } from '../../common/constants.js';
//import { Roles } from 'meteor/alanning:roles';


Meteor.methods({
  addVehicle: (vehicle) => {

    if (!Meteor.userId()) {

      throw new Meteor.Error('not-authorized');

    }

    return Vehicles.insert(vehicle);
  },

  removeVehicle: (vehicleId) => {


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