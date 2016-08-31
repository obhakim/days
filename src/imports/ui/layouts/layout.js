import './layout.html';

import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { APP, SESSION } from '../../common/constants.js';

import '../lib/moment-locales.js';
import '../components/loading.js';

Template.Layout.helpers({
  version: () => APP.VERSION,
  fullName: () => (Meteor.user() ? Meteor.user().profile.firstName +
    ' ' + Meteor.user().profile.lastName : ''),
  loading: Session.equals(SESSION.ISLOADING, true),
});

Template.Layout.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // create sidebar and attach to menu open
      this.$('.ui.sidebar').sidebar({ context: this.$('#body') }).sidebar('attach events', '.toc.item');
    }
  });
});

Template.Layout.events({
  'click #fr_button'(event) {
    return TAPi18n.setLanguage("fr");
  },
  'click #en_button'(event) {
    return TAPi18n.setLanguage("en");
  },
})
