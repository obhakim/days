import './vehicles.html';
import { Template } from 'meteor/templating';
import { Vehicles } from '../../api/vehicles/vehicles.js';

import '../components/vehicle-item.js';


Template.Vehicles.onCreated(function vehiclesPageOnCreated() {
  this.autorun(() => {
    this.subscribe('myVehicles');
  });
});

Template.Vehicles.helpers({
  vehicles: function () {
    return Vehicles.find();
  },
});