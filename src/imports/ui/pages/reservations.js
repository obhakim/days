import './reservations.html';
import { Template } from 'meteor/templating';
import { Reservations } from '../../api/reservations/reservations.js';

import '../components/reservation-item.js';
import { CONST, SESSION } from '../../common/constants.js';


Template.Reservations.onCreated(function reservationsPageOnCreated() {
  this.autorun(() => {
    this.subscribe('reservations');
  });
});

Template.Reservations.events({

  'click #recherche': function() {
    const date = $('#searchdate').val();
    Session.set('date', date);
    Session.set('day', date.split('/')[0]);
    Session.set('month', date.split('/')[1]);
    Session.set('year', date.split('/')[2]);
    delete Session.keys['name'];
  },
  'keyup #nom': function(event) {
    const name = $(event.target).val();
    Session.set('name', name);
    delete Session.keys['date'];
  },
});

Template.Reservations.helpers({
  reservations() {
    let filter = {};
    if (!Session.get('name') && !Session.get('date')) {
      filter = {};
    } else if (Session.get('name')) {
      filter = {
        ownerName: {
          $regex: Session.get('name'),
        },
      };
    } else if (Session.get('date')) {
      const startday = parseInt(Session.get('day'), 10);
      const startDate = new Date(Session.get('year'), Session.get('month') - 1, startday);
      const endDate = new Date(Session.get('year'), Session.get('month') - 1, startday + 1);
      filter = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }
    return Reservations.find(
      filter
      , {
        sort: {
          createdAt: -1,
        },
      });
  },
});

Template.Reservations.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY',
    locale: CONST.DEFAULT_LOCALE,
  })
});