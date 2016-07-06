import { Meteor } from 'meteor/meteor';

import { VehicleTypes } from '../vehicle-types.js';


Meteor.publish('vehicleTypes', function vehicleTypes() {
	
  return VehicleTypes.find()
})

