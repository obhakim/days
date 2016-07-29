import './driver-vehicles.html';
import '../components/vehicle-item.js';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';
// import { VehicleTypes } from '../../api/vehicle-types/vehicle-types.js';
import { Vehicles } from '../../api/vehicles/vehicles.js';
import { Models } from '../../api/models/models.js';

Template.DriverVehicles.onCreated(function reservationsPageOnCreated() {
  const self = this;
  self.autorun(() => {
    self.subscribe('vehicletypes');
    self.subscribe('myVehicles');
    self.subscribe('brands');
  });
});

Template.DriverVehicles.helpers({
  vehicles: () => Vehicles.find().fetch(),
  brandsList: function () {
    // return Models.find().fetch();

    return _.uniq(Models.find({}, {
      sort: { brand: 1 },
    }).fetch(), true, (doc) => doc.brand);
  },

  modelsList: function () {
    // return Models.find().fetch()
    return _.uniq(Models.find({
      brand: Session.get('selected_brand'),
    }, {
      sort: {
        model: 1,
      },
    }).fetch(), true, (doc) => doc.model);
  },

  vehicleTypesList: function () {
    return _.uniq(Models.find({
      model: Session.get('selected_model'),
      brand: Session.get('selected_brand'),
    }, {
      sort: { vehicleTypeId: 1 },
    }).fetch(), true, (doc) => doc.vehicleTypeId);
  },

  setModelUpdate: function () {},

  /*
  var data=Vehicles.find({_id:Session.get('vehid')}).fetch();
    $( "#licence" ).val(data[0].license);
    $( "#brand" ).val(data[0].brand);
    $( "#model" ).val(data[0].model);
    $( "#VehicleTypeId" ).val(data[0].vehicleTypeId);

     return data;
  }});
  */
});

Template.DriverVehicles.events({
  'submit #form': function driverVehiclesSubmitForm(event) {
    event.preventDefault();

    const vehicle = {
      ownerId: Meteor.userId(),
      licence: event.target.licence.value,
      brand: event.target.brand.value,
      model: event.target.model.value,
      vehicleTypeId: event.target.type.value,
    };
    // console.log(vehicle);
    Meteor.call('addVehicle', vehicle, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
        event.target.reset();
        event.target.licence.focus();
      }
    });
    // return false;
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

  'click .delete'() {
    const vehicleId = this._id;
    Meteor.call('removeVehicle', vehicleId);
  },

  'click .editer'() {
    // $('#type option').attr('value",this.vehicleTypeId).text(this.vehicleTypeId);
    Session.set('id', this._id);
    $('.cancel').show();
    $('#sub').attr('value', 'Save', 'type', 'button').addClass('update').prop('type', 'button');
    $('#licence').val(this.licence);
    $('#brand').val(this.brand);
    $('#model').find('option').remove().end().append($('<option>', {
      value: this.model,
      text: this.model,
    }));
    $('#type').find('option').remove().end().append($('<option>', {
      value: this.vehicleTypeId,
      text: this.vehicleTypeId,
    }));
  },

  'click .cancel'() {
    $('.cancel').hide();
    $('#sub').attr('value', 'Enregister', 'type', 'submit')
      .removeClass('update').prop('type', 'submit');
  },


  'change #brand'(event) {
    // var selected_brand = event.target.value;
    Session.set('selected_brand', event.target.value);
    $('#model option').attr('value', '').text('');
    // console.log(Session.set(selected_brand));
    // Meteor.call('showModels',selected_brand);
  },

  'change #model'(event) {
    // var selected_brand = event.target.value;
    Session.set('selected_model', event.target.value);
    $('#type option').attr('value', '').text('');
    // console.log(Session.set(selected_model));
    // Meteor.call('showModels',selected_brand);
  },
});
