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
  });

Template.DriverVehicles.helpers({
  modelsList: function () {
    return Models.find().fetch();
  },
});

Template.DriverVehicles.helpers({
   vehicleTypesList: function () {
    return VehicleTypes.find().fetch();
  },
});