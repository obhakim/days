import './driver-vehicles.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';

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

	vehicleTypesList: function () {
			
	return s = _.uniq(Models.find({model:Session.get("selected_model"),brand:Session.get("selected_brand")},
	{ sort:
	 { vehicleTypeId: 1 }
	}).fetch(), true, doc => {
	return doc.vehicleTypeId;
	});
	},

	setmodelupdate: function() {},
  	
 	/*var data=Vehicles.find({_id:Session.get("vehid")}).fetch();
  	$( "#licence" ).val(data[0].license);
    $( "#brand" ).val(data[0].brand);
    $( "#model" ).val(data[0].model);
    $( "#VehicleTypeId" ).val(data[0].vehicleTypeId);


 return data;
}});*/

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

			event.target.licence.value="";
			event.target.brand.value="";
			event.target.model.value="";
			event.target.type.value="";

			}

			});

			//return false;

			},

	'click .delete'() {
			var vehicleId = this._id;

			Meteor.call('removeVehicle',vehicleId );
	},

	'click .editer'() {

			$( "#licence" ).val(this.licence);
			$( "#brand" ).val(this.brand);
			if ($('#model > option').length > 1) {

				$( "#model" ).val(this.model);		
			}
			 if ($('#model > option').length <= 1)  { $('#model option').attr("value",this.model).text(this.model); }
			//$( "#model" ).val(this.model);
			

						//$('#model option').attr("value",this.model).text(this.model);
			//$('#model option:contains("")').text(this.model);
			$('#type option').attr("value",this.vehicleTypeId).text(this.vehicleTypeId); 

	},

	/*'click .update'() {

			var vehicleId = this._id;


			Meteor.call('updateVehicle',vehicleId );
	},*/

	'change #brand'(event,template) {
		
		 	//var selected_brand = event.target.value;
 			Session.set("selected_brand",event.target.value);
 			$('#model option').attr("value","").text(""); 
 			//console.log(Session.set(selected_brand));
 				//Meteor.call('showModels',selected_brand);

	},

	'change #model'(event,template) {
		
		 	//var selected_brand = event.target.value;
 			Session.set("selected_model",event.target.value);
 			$('#type option').attr("value","").text(""); 
 			//console.log(Session.set(selected_model));
 				//Meteor.call('showModels',selected_brand);

	},
});