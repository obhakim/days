import './layout.html';
import './sidemenu.html';

import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { APP, SESSION } from '../../common/constants.js';

import '../lib/moment-locales.js';
import '../components/loading.js';

Template.layout.helpers({
  version: function () {
    return APP.VERSION;
  },
  fullName: function () {
    return Meteor.user() ? Meteor.user().profile.firstName +
    ' ' + Meteor.user().profile.lastName : '';
  },
  loading: Session.equals(SESSION.ISLOADING, true),
});

Template.layout.onRendered = function () {
  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar({ context: $('#body') }).sidebar('attach events', '.toc.item');
};
