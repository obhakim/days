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

  "click #recherche": function(evt) {
    var date = $("#searchdate").val();
    Session.set("date", date);
    Session.set("day", date.split('/')[0])
    Session.set("month", date.split('/')[1])
    Session.set("year", date.split('/')[2])
    delete Session.keys['name'];
  },
  "keyup #nom": function(evt) {
    var name = $(evt.target).val();
    Session.set("name", name);
    delete Session.keys['date'];
  },
});

Template.Reservations.helpers({
  reservations: function() {
    if (!Session.get('name') && !Session.get('date')) {
      return Reservations.find({}, {
        sort: {
          createdAt: -1,
          status: -1
        }
      });
    }
    if (Session.get('name')) {
      return Reservations.find({
        ownerName: {
          $regex: Session.get('name')
        }
      });
    }
    if (Session.get('date')) {
      startday = parseInt(Session.get('day'), 10);
      var startDate = new Date(2016, Session.get('month') - 1, startday);
      var endDate = new Date(2016, Session.get('month') - 1, startday + 1);
      return Reservations.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate
        }
      }, {
        sort: {
          createdAt: -1
        }
      });
    }
  },
});

Template.Reservations.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY',
    locale: CONST.DEFAULT_LOCALE,
  })
});