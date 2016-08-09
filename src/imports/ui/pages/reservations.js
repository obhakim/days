import './reservations.html';
import '../components/reservation-item.js';

import { $ } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Reservations } from '../../api/reservations/reservations.js';
import { CONST } from '../../common/constants.js';

//https://themeteorchef.com/snippets/simple-search/

Template.Reservations.onCreated(function reservationsPageOnCreated() {
  const instance = Template.instance();

  instance.searchQuery = new ReactiveVar();
  instance.searching = new ReactiveVar(false);

  instance.autorun(() => {
    instance.subscribe('reservations', instance.searchQuery.get(), () => {
      setTimeout(() => {
        instance.searching.set(false);
      }, 300);
    });
  });
});

Template.Reservations.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
  reservations() {
    const albums = Reservations.find();
    if (albums) {
      return albums;
    }
  },
});

Template.Reservations.events({
  'click #recherche'(event, instance) {
    const value = event.target.value.trim();

    

    instance.searchQuery.set(value);

    if (value !== '' && event.keyCode === 13) {
      instance.searchQuery.set(value);
      instance.searching.set(true);
    }

    if (value === '') {
      instance.searchQuery.set(value);
    }
  },
});

Template.Reservations.events({
  'click #recherche': function () {
    const date = $('#searchdate').val();
    const name = $('#nom').val();
    Session.set('name', name);
    Session.set('date', date);
    Session.set('day', date.split('/')[0]);
    Session.set('month', date.split('/')[1]);
    Session.set('year', date.split('/')[2]);
  },
});

// Template.Reservations.helpers({
//   reservations: function () {
//     let filter = {};
//     if (Session.get('name') && Session.get('date')) {
//       const startmonth = parseInt(Session.get('month'), 10);
//       const myDate = new Date(Session.get('year'), startmonth - 1, Session.get('day'));
//       const startDay = moment(myDate).startOf('day').toDate();
//       const endDay = moment(myDate).endOf('day').toDate();
//       filter = {
//         $and: [{
//           ownerName: Session.get('name'),
//         }, {
//           createdAt: {
//             $gte: startDay,
//             $lt: endDay,
//           },
//         }],
//       };
//     }
//     return Reservations.find(
//       filter,
//       {
//         sort: {
//           createdAt: -1,
//           status: -1,
//         },
//       });
//   },
// });

Template.Reservations.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: 'DD/MM/YYYY',
    locale: CONST.DEFAULT_LOCALE,
  });
});
