import { Meteor } from 'meteor/meteor';

import { Models } from '../models.js';
import { Vehicles } from '../../vehicles/vehicles.js';

Meteor.publish('brand', function brand() {
	//console.log(Models.find().count()); 
  return Models.find();
})
Meteor.publish('myVehicles', function publishVehicles() {
 return Vehicles.find(); 
})