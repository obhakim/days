import './driver-vehicles.html';
// import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { CONST, SESSION } from '../../common/constants.js';
import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';

Meteor.subscribe('myVehicles');
Meteor.subscribe('brand');
Meteor.subscribe('VehicleTypes');

Template.DriverVehicles.helpers({

  brandsList: function() {
    return Models.find().fetch();

  },

  vehicleTypesList: function() {
    return VehicleTypes.find().fetch();
  },
});

Template.DriverVehicles.helpers({
  vehicles: () => Vehicles.find(),
});

Template.DriverVehicles.helpers({
  setVehicleTypeId: function() {

    var distinctvehicleTypeId = _.uniq(Models.find({
      'brand': Session.get("brand")
    }, {
      sort: {
        vehicleTypeId: 1
      },
      fields: {
        vehicleTypeId: true
      }
    }).fetch().map(function(x) {
      return x.vehicleTypeId;
    }), true);
    return distinctvehicleTypeId;
  }
});

Template.DriverVehicles.helpers({
  vehicles: function() {
    var vt = Vehicles.find({}).fetch();
    return vt;
  }
});

if (Meteor.isClient) {
  Template.DriverVehicles.events({
    'submit form': function(e) {
      e.preventDefault();
      const data = {

        ownerId: Meteor.userId(),
        license: $("#licence").val(),
        registrationCard: $("#registrationCard").val(),
        brand: $("#brandId").val(),
        model: $("#modelId").val(),
        vehicleTypeId: $("#VehicleTypeId").val(),
        regYear: $("#regYear").val(),
        color: $("#color").val(),

      };


      Meteor.call('addVehicle', data, (error) => {
        if (error) {
          Session.set(SESSION.ERROR, error);
        } else {
          console.log("insertion success");
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

      Meteor.call('removeVehicle', this._id);

    },
    'change #chooseupdate': function() {
      console.log(this._id);
      if (Session.get("vehid"))
        delete Session.keys['vehid']
      var data = Vehicles.find({
        _id: this._id
      }).fetch();
      Session.set("vehid", this._id);

    },


  "click #update": function(evt) {

    const data = {
      vehicleid: this._id,
      ownerId: Meteor.userId(),
      license: $("#licence").val(),
      registrationCard: $("#registrationCard").val(),
      brand: $("#brandId").val(),
      model: $("#modelId").val(),
      vehicleTypeId: $("#VehicleTypeId").val(),
      regYear: $("#regYear").val(),
      color: $("#color").val(),

    };
    Meteor.call('updateVehicle', data);
    delete Session.keys['vehid'];
  },

});

}
//Remplir la formulaire pour faire la mise à jour
Template.DriverVehicles.helpers({
  setmodelupdate: function() {
    if (Session.get("vehid")) {
      var data = Vehicles.find({
        _id: Session.get("vehid")
      }).fetch();
      $("#licence").val(data[0].license);
      $("#registrationCard").val(data[0].registrationCard);
      $("#brandId").val(data[0].brand);
      $("#modelId").val(data[0].model);
      $("#VehicleTypeId").val(data[0].vehicleTypeId);
      //$( "#modelId" ).val(data[0].modelId);
      $("#regYear").val(data[0].regYear);
      $("#color").val(data[0].color);

      return data;
    }
  }
});

//lister les voitures enregtrées
Template.DriverVehicles.helpers({
  setmodel: function() {

    var distinctmodel = _.uniq(Models.find({
      'brand': Session.get("brand")
    }, {
      sort: {
        model: 1
      },
      fields: {
        model: true
      }
    }).fetch().map(function(x) {
      return x.model;
    }), true);
    return distinctmodel;
  }
});

Template.DriverVehicles.helpers({
  setbrand: function() {

    var mod = Models.find({}).fetch();

    var distinctEntries = _.uniq(Models.find({}, {
      sort: {
        brand: 1
      },
      fields: {
        brand: true
      }
    }).fetch().map(function(x) {
      return x.brand;
    }), true);
    return distinctEntries;
  }
});
Template.DriverVehicles.onRendered(function DriverVehiclesOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: 'YYYY',
    locale: CONST.DEFAULT_LOCALE,

  });
});