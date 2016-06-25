import { Meteor } from 'meteor/meteor';
import { Vehicles} from './vehicles.js';

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

	}
  

    });

