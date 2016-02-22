// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Days',
  DESCRIPTION: 'Drivers At Your Service (Days) VTC application officielle',
  DEFAULT_LOCALE: 'fr',
  DEFAULT_DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  VERSION: 'V0.0.1'
};