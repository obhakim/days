// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Days',
  DESCRIPTION: 'Drivers At Your Service (Days) VTC application officielle'
};

SESSION = {
    ERROR: 'SESSION_ERROR',
    VALIDATION_ERRORS: 'SESSION_VALIDATION_ERRORS'
}