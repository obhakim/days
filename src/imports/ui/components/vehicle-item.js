import './vehicle-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';
import { Roles } from 'meteor/alanning:roles';

Template.VehicleItem.helpers({});

Template.VehicleItem.events({

  'click .delete'() {
    var vehicleId = this._id;
    Meteor.call('removeVehicle', vehicleId);
  },
  'click .update'() {
    const vehicleId = Session.get('id');
    const vehicle = {
      ownerId: Meteor.userId(),
      licence: $('#licence').val(),
      brand: $('#brand').val(),
      model: $('#model').val(),
      vehicleTypeId: $('#type').val(),
    };

    Meteor.call('updateVehicle', vehicleId, vehicle, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
        ('#licence').val('');
        ('#brand').val('');
        ('#model').val('');
        ('#type').val('');
      }
    });
  },
});