import './vehicle-item.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';
import { Roles } from 'meteor/alanning:roles';

Template.VehicleItem.helpers({

});

Template.VehicleItem.events({

    'click .delete'() {
        var vehicleId = this._id;

        Meteor.call('removeVehicle',vehicleId );
    },
     'click .update': function () {
    },
});
