import './reservations.html';
import '../components/reservation-item.js';
import '../components/loading.js';

import { $ } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Reservations } from '../../api/reservations/reservations.js';
import { CONST } from '../../common/constants.js';
// https://themeteorchef.com/snippets/simple-search/

Template.Reservations.onCreated(function reservationsPageOnCreated() {
  const instance = Template.instance();

  instance.searchWord = new ReactiveVar('');
  instance.startDate = new ReactiveVar();
  instance.endDate = new ReactiveVar();
  instance.searching = new ReactiveVar(false);
  instance.totalReservations = new ReactiveVar();
  instance.limit = new ReactiveVar(CONST.PAGE_SIZE);
  instance.autorun(() => {
    instance.subscribe('reservations.list',
      instance.searchWord.get(),
      instance.startDate.get(),
      instance.endDate.get(),
      instance.limit.get(),
      () => {
        setTimeout(() => {
          instance.searching.set(false);
        }, 300);
      });
    instance.subscribe('reservations.count');
  });
});

Template.Reservations.helpers({
  searching() {
    return Template.instance().searching.get();
  },
  // TODO
  // count() {
  //   return Template.instance().searchQuery.get();
  // },
  reservations() {
    const albums = Reservations.find();
    if (albums) {
      return albums;
    }
  },
});

Template.Reservations.events({
  'click #recherche'(event, instance) {
    instance.limit.set(CONST.PAGE_SIZE);
    let startDate = $('#startDate').val().trim();
    let endDate = $('#endDate').val().trim();
    const searchWord = $('#searchWord').val().trim();
    if (startDate && startDate !== '') {
      startDate = moment(startDate, CONST.DEFAULT_DATETIME_FORMAT).toDate();
    } else {
      startDate = null;
    }

    if (endDate && endDate !== '') {
      endDate = moment(endDate, CONST.DEFAULT_DATETIME_FORMAT).add('days', 1).toDate();
    } else {
      endDate = null;
    }

    if (instance.searchWord.get() !== searchWord ||
      instance.startDate.get() !== startDate ||
      instance.endDate.get() !== endDate) {
      instance.searchWord.set(searchWord);
      instance.startDate.set(startDate);
      instance.endDate.set(endDate);

      instance.searching.set(true);
    }
  },
  'click #plus'(event, instance) {
    instance.limit.set(instance.limit.get() + CONST.PAGE_SIZE);
  },
});

Template.Reservations.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATE_FORMAT,
    locale: CONST.DEFAULT_LOCALE,
  });
});
