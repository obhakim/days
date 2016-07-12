import './driver-vehicles.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';
import { Helpers } from '../../common/helpers.js';
import { Roles } from 'meteor/alanning:roles';

Template.DriverVehicles.onCreated(function reservationsPageOnCreated() {
  const self = this;
    self.autorun(function () {
    self.subscribe('vehicletypes');
    self.subscribe('myVehicles');
    self.subscribe('brands');
  });
});

Template.DriverVehicles.helpers({
	vehicles: () => Vehicles.find().fetch(),
	brandsList: function () {
			// return Models.find().fetch();

			return _.uniq(Models.find({},{sort: {
			brand: 1}
			}).fetch(), true, doc => {
			return doc.brand;
			});
			},

	modelsList: function () {
	// return Models.find().fetch()
	return _.uniq(Models.find({brand:Session.get("selected_brand")},{sort: {
	model: 1}
	}).fetch(), true, doc => {
	return doc.model;
	});
	},
   vehicleType: function () {
			
	return  VehicleTypes.find({},{limit: limit}).fetch();
	
			},
	vehicleTypesList: function () {
			
	return _.uniq(Models.find({brand:Session.get("selected_brand"),model:Session.get("selected_model")},
	{ sort:
	 { vehicleTypeId: 1 }
	}).fetch(), true, doc => {
	return doc.vehicleTypeId;
	});
			},

	isUpdutable: function () {
    return this.status < CONST.VEHICLE_STATUSES.UPDATE && Helpers.isDriver();
  }
	});


Template.DriverVehicles.events({

	'submit #form': function driverVehiclesSubmitForm(event) {
			event.preventDefault();

			var vehicle = {
			ownerId: Meteor.userId(),
			licence: event.target.licence.value,
			brand: event.target.brand.value,
			model: event.target.model.value,
			vehicleTypeId: event.target.type.value,
			};
			//console.log(vehicle);
			Meteor.call("addVehicle",vehicle, (error) => {
			if (error) {
			Session.set(SESSION.ERROR, error);
			} else {

			FlowRouter.go('/s/vehicles');
			
			}

			});

			//return false;

			},

	'click .delete'() {
			var vehicleId = this._id;

			Meteor.call('removeVehicle',vehicleId );
	},
	 'click .update': function () {
            event.target.licence.value="jj";
			event.target.brand.value="hhh";
			event.target.model.value="hhh";
			event.target.type.value="hh";
  },
	'change #brand'(event,template) {
		
		 	//var selected_brand = event.target.value;
 			Session.set("selected_brand",event.target.value);
 			//console.log(Session.set(selected_brand));
 				//Meteor.call('showModels',selected_brand);

	},

	'change #model'(event,template) {
		
		 	//var selected_brand = event.target.value;
 			Session.set("selected_model",event.target.value);
 			//console.log(Session.set(selected_model));
 				//Meteor.call('showModels',selected_brand);

	},
});
