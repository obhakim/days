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

  instance.searchWord = new ReactiveVar();
  instance.startDate = new ReactiveVar();
  instance.endDate = new ReactiveVar();
  instance.searching = new ReactiveVar(false);

  instance.autorun(() => {
    instance.subscribe('reservations.list',
      [
        instance.searchWord.get(),
        instance.startDate.get(),
        instance.endDate.get(),
      ], () => {
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
    const startDate = $('#startDate').val().trim();
    const endDate = $('#endDate').val().trim();
    const searchWord = $('#searchWord').val().trim();

    if (searchWord !== '') {
      instance.searchWord.set(searchWord);
      instance.searching.set(true);
    }

    if (startDate !== '') {
      instance.startDate.set(moment(startDate, CONST.DEFAULT_DATETIME_FORMAT).toDate());
      instance.searching.set(true);
    }

    if (endDate !== '') {
      instance.endDate.set(moment(endDate, CONST.DEFAULT_DATETIME_FORMAT).toDate());
      instance.searching.set(true);
    }
  },
});

Template.Reservations.onRendered(function ReservationsOnRendered() {
  this.$('.datetimepicker').datetimepicker({
    format: CONST.DEFAULT_DATE_FORMAT,
    locale: CONST.DEFAULT_LOCALE,
  });
});
