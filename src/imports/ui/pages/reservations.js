import './reservations.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Reservations } from '../../api/reservations/reservations.js';

Meteor.subscribe('reservations');

Template.reservations.helpers({
  reservations: function () {
    return Reservations.find();
  },
});
