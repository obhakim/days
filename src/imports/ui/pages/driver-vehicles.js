import './driver-vehicles.html';
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Session } from 'meteor/session';
// import { CONST, SESSION } from '../../common/constants.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';

Template.DriverVehicles.onCreated(function reservationsPageOnCreated() {
  const self = this;
    self.autorun(function () {
    self.subscribe('vehicletypes');
    self.subscribe('vehicles');
    self.subscribe('models');
  });
});

Template.DriverVehicles.helpers({
vehicles: () => Vehicles.find(),
brandsList: function () {
		// return Models.find().fetch();
		return _.uniq(Models.find({},{sort: {
		brand: 1}
		}).fetch(), true, doc => {
		return doc.brand;
		});
		},
modelsList: function (brand) {
		// return Models.find().fetch();
		return _.uniq(Models.find({},{sort: {
		brand: 1}
		}).fetch(), true, doc => {
		return doc.brand;
		});
		},
vehicleTypesList: function () {
		return VehicleTypes.find().fetch();
},
});
Template.DriverVehicles.events({

     'change .brand': function(e,t){
        // do whatever.......
     },
 });
