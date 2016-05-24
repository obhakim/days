import './driver-vehicles.html';
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { Session } from 'meteor/session';
// import { CONST, SESSION } from '../../common/constants.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';

Template.DriverVehicles.onCreated(function reservationsPageOnCreated() {
  this.autorun(() => {
    this.subscribe('vehicles');
  });
});

Template.DriverVehicles.helpers({
  vehicles: () => Vehicles.find(),
});
