import './reservations.html';
import { Template } from 'meteor/templating';
import { Reservations } from '../../api/reservations/reservations.js';

import '../components/reservation-item.js';


Template.Reservations.onCreated(function reservationsPageOnCreated() {
  this.autorun(() => {
    this.subscribe('reservations');
  });
});

Template.Reservations.helpers({
  reservations: function() {
    return Reservations.find({}, {
      sort: {
        createdAt: -1,
        status: -1
      }
    });
  },
});
