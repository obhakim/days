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

Template.DriverVehicles.onCreated(function driverVehiclesPageOnCreated() {
  this.autorun(() => {
    this.subscribe('myVehicles');
    this.subscribe('brands');
    this.subscribe('vehicletypes');
  });
});

Template.DriverVehicles.helpers({
  vehicles: () => Vehicles.find().fetch(),

  brandsList: function () {
    // return Models.find().fetch();

    return _.uniq(Models.find({}, {
      sort: {
        brand: 1,
      },
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

  vehicleTypeId: function () {
    const model = Session.get('selected_model');
    const brand = Session.get('selected_brand');
    let typeId = '';

    if (model && brand) {
      typeId = Models.findOne({ model, brand }).vehicleTypeId;
    }

    return typeId;
  },

  regYearList: function () {
    const all = (new Date()).getFullYear();
    const table = [];

    for (let i = 0; i <= 25; i++) {
      table.push(all - i);
    }

    return table;
  },

});

Template.DriverVehicles.events({
  'submit #form': function driverVehiclesSubmitForm(event) {
    event.preventDefault();

    const vehicle = {
      ownerId: Meteor.userId(),
      licence: event.target.licence.value,
      brand: event.target.brand.value,
      model: event.target.model.value,
      vehicleTypeId: event.target.vehicleType.value,
      regYear: event.target.regYear.value,
      color: event.target.color.value,
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
      vehicleTypeId: $('#vehicleType').val(),
      regYear: $('#regYear').val(),
      color: $('#color').val(),
    };

    Meteor.call('updateVehicle', vehicleId, vehicle, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
        event.target.reset();
        event.target.licence.focus();
      }
    });
  },

  'click #delete'() {
    const vehicleId = this._id;
    Meteor.call('removeVehicle', vehicleId);
  },

  'click #edit'() {
    Session.set('id', this._id);
    $('#cancel').show();
    $('#sub').attr('value', 'Save', 'type', 'button').addClass('update').prop('type', 'button');
    $('#licence').val(this.licence);
    $('#brand').val(this.brand);
    $('#model').find('option').remove().end().append($('<option>', {
      value: this.model,
      text: this.model,
    }));
    $('#vehicleType').val(this.vehicleTypeId);
    $('#regYear').val(this.regYear);
    $('#color').val(this.color);
  },

  'click #cancel'() {
    $('#cancel').hide();
    $('#sub').attr('value', 'Enregister', 'type', 'submit')
      .removeClass('update').prop('type', 'submit');
  },

  'change #brand'(event) {
    Session.set('selected_brand', event.target.value);
    $('#model option').attr('value', '').text('');
  },

  'change #model'(event) {
    Session.set('selected_model', event.target.value);
  },
});
