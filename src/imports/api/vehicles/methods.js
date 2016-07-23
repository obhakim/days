import { Meteor } from 'meteor/meteor';
import { Vehicles} from './vehicles.js';
import { _ } from 'meteor/underscore';
import { CONST } from '../../common/constants.js';
//import { Roles } from 'meteor/alanning:roles';


Meteor.methods({
	addVehicle: (vehicle) => {

   if (! Meteor.userId()) {

    throw new Meteor.Error('not-authorized');

  }

  return Vehicles.insert(vehicle);
},

removeVehicle: (vehicleId) => {


    return Vehicles.remove(vehicleId);
  },

},

updateVehicle: function (vehicleId, userId) { 
    // Logged user
    if (userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
    }

    // Driver or Admin only
    // Get reservation
    const v = Vehicles.findOne(vehicleId);
    if (!v) {
      throw new Meteor.Error('not-found', "vehicule non retrouver");
    }
    // Only created may be accepted
    if (v.status > CONST.VEHICLE_STATUSES.CREATED) {
      throw new Meteor.Error('not-applicable', "N'est pas applicable");
    }

    const id = Vehicles.update(vehicleId, {
      $set: {
        status: CONST.VEHICLE_STATUSES.ACCEPTED,
        driverId: userId, // Preparing "assign to driver"
      },
    }, {
      validationContext: 'updateVehicle',
    });
    
    return id;
  },
  

});