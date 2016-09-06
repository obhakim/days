import './layout.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
// import { TAPi18n } from 'meteor/tap:i18n';
// import { FlowRouter } from 'meteor/kadira:flow-router';
import { APP, SESSION } from '../../common/constants.js';

import '../lib/moment-locales.js';
import '../components/loading.js';

Template.Layout.helpers({
  version: () => APP.VERSION,
  fullName: () => (Meteor.user() ? Meteor.user().profile.firstName +
    ' ' + Meteor.user().profile.lastName : ''),
  loading: Session.equals(SESSION.ISLOADING, true),
});

Template.Layout.onRendered(function () {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // create sidebar and attach to menu open
      this.$('.ui.sidebar')
        .sidebar({ context: this.$('#body') })
        .sidebar('attach events', '.toc.item');
    }
  });
});

// Template.Layout.events({
//   'click #fr_button': () => {
//     FlowRouter.setParams({ lang: 'fr' });
//     TAPi18n.setLanguage('fr');
//   },
//   'click #en_button': () => {
//     FlowRouter.setParams({ lang: 'en' });
//     TAPi18n.setLanguage('en');
//   },
// });
