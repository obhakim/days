import './reservations-history.html';
import '../components/reservation-item.js';
import '../components/loading.js';

import { $ } from 'meteor/jquery';
import { moment } from 'meteor/momentjs:moment';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Reservations } from '../../api/reservations/reservations.js';
import { CONST } from '../../common/constants.js';
// https://themeteorchef.com/snippets/simple-search/

Template.ReservationsHistory.onCreated(function reservationsHistoryPageOnCreated() {
  const instance = Template.instance();

  instance.searchWord = new ReactiveVar('');
  instance.startDate = new ReactiveVar();
  instance.endDate = new ReactiveVar();
  instance.searching = new ReactiveVar();
  instance.limit = new ReactiveVar(CONST.PAGE_SIZE);
  instance.autorun(() => {
    instance.subscribe('reservations.history',
      instance.searchWord.get(),
      instance.startDate.get(),
      instance.endDate.get(),
      instance.limit.get(),
      () => {
        setTimeout(() => {
          instance.searching.set(false);
        }, 300);
      });
    updateMoreAvailable();
  });
});

Template.ReservationsHistory.helpers({
 searching() {
    return Template.instance().searching.get();
  },
  reservations() {
    updateMoreAvailable();
    return Reservations.find();
  },
});

Template.ReservationsHistory.events({
  'click #recherche'(event, instance) {
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

    instance.limit.set(CONST.PAGE_SIZE);
    updateMoreAvailable();
    },
});

Template.ReservationsHistory.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATE_FORMAT,
    locale: CONST.DEFAULT_LOCALE,
  });
});
