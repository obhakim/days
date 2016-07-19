import './driver-vehicles.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { CONST, SESSION } from '../../common/constants.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';


Template.DriverVehicles.onCreated(function reservationsPageOnCreated() {
  const self = this;
    self.autorun(function(){
    self.subscribe('myVehicles');
    self.subscribe('brands');

  });
});



Template.DriverVehicles.helpers({

   Brands: function(){

 	return _.uniq(Models.find({},{sort: {
      brand: 1}
    }).fetch(), true, doc => {
      return doc.brand;
    });
   },

   Vehicles: function(){

 	return Vehicles.find().fetch();
   
   },

  	

});

/*vehicles: () => Vehicles.find(),
	 brands: () =>  Models.distinct('brand'),*/

Template.DriverVehicles.events({
/*
	'click .brand'() {

    Meteor.call('brands.selected', this.brand);
  },


  */
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

});
