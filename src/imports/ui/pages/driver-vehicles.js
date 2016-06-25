import './driver-vehicles.html';
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';

Meteor.subscribe('vehicles');
Meteor.subscribe('brand');
Meteor.subscribe('VehicleTypes',function () {
    // This will output 50, fine
    console.log("teste1");
});

Template.DriverVehicles.helpers({

brandsList: function () {
	return Models.find().fetch();

		},

vehicleTypesList: function () {
		return VehicleTypes.find().fetch();
},
});

Template.DriverVehicles.helpers({
  vehicles: () => Vehicles.find(),
});

//VehicleTypeId
Template.DriverVehicles.helpers({
   setVehicleTypeId: function() {
  	
 var distinctvehicleTypeId = _.uniq(Models.find({'brand': Session.get("brand")}, {
    sort: {vehicleTypeId: 1}, fields: {vehicleTypeId: true}
}).fetch().map(function(x) {
    return x.vehicleTypeId;
}), true);
    return distinctvehicleTypeId;
}});

Template.DriverVehicles.helpers({
  setAuthor: function() {
  	if(Meteor.userId())
    var comp = Meteor.users.find().fetch();

 var vt=Vehicles.find({}).fetch();
    return vt;
}
});
if (Meteor.isClient) {
Template.DriverVehicles.events({
  'submit form': function(e){
e.preventDefault();
 const data = {
      ownerId:Meteor.userId(),
  	  license: $( "#licence" ).val(), 
      registrationCard:$( "#registrationCard" ).val(),
      brand:  $( "#brandId" ).val(),
      model: $( "#modelId" ).val(),
      vehicleTypeId: $( "#VehicleTypeId" ).val(), 
      regYear:$( "#regYear" ).val(), 
      color:$( "#color" ).val(),
     
    };
 

Meteor.call('addVehicle', data, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
       console.log("insertion success");  // TODO : replace with redirection by root name
      }
    });
   
    return false;

},
"change #brandId": function(evt) {
  var newValue = $(evt.target).val();
   Session.set("brand", newValue);
 },
// supprimer une voiture
"click #delete": function(evt) {

	//var data=Vehicles.find({'ownerId': Meteor.userId()}).fetch();
	Meteor.call('removeVehicle',this._id);
	
	},

 });
}

//
Template.DriverVehicles.helpers({
   setmodel: function() {
  	
 var distinctmodel = _.uniq(Models.find({'brand': Session.get("brand")}, {
    sort: {model: 1}, fields: {model: true}
}).fetch().map(function(x) {
    return x.model;
}), true);
    return distinctmodel;
}});
//
Template.DriverVehicles.helpers({
   setbrand: function() {
  	
var mod=Models.find({}).fetch();

  var distinctEntries = _.uniq(Models.find({}, {
    sort: {brand: 1}, fields: {brand: true}
}).fetch().map(function(x) {
    return x.brand;
}), true);
    return distinctEntries;
}});
Template.DriverVehicles.onRendered(function DriverVehiclesOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: 'YYYY',
    locale: CONST.DEFAULT_LOCALE,
 
  });
});