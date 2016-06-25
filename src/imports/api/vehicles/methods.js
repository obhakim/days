import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { CONST } from '../../common/constants.js';
import { Vehicles } from './vehicles.js';

if (Meteor.isServer){
Meteor.methods({

   addVehicle: (vehicle) => {
    const userId = Meteor.userId();
    Vehicles.insert({
    ownerId:vehicle.ownerId,
    license: vehicle.license,
    registrationCard:vehicle.registrationCard,
    brand: vehicle.brand,
    model: vehicle.model,
    vehicleTypeId: vehicle.vehicleTypeId,
    regYear:vehicle.regYear, 
    color:vehicle.color,
    })

    return userId;
},

 "removeVehicle" : function (value) {
 return  Vehicles.remove(value);
   
  }
 
  
  });


}
