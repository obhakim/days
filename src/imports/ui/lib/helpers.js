import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CONST } from '../../common/constants.js';
import { Helpers } from '../../common/helpers.js';
import { moment } from 'meteor/momentjs:moment';


Template.registerHelper('isLoggedIn', () => !!Meteor.user());

Template.registerHelper('isDriver', () => Helpers.isDriver());

Template.registerHelper('isAdmin', () => Helpers.isAdmin());

Template.registerHelper('isDriverOrAdmin', () => Helpers.isDriverOrAdmin());

Template.registerHelper('currentUserEmail', () => {
  if (Meteor.user()) {
    return Meteor.user().emails[0].address;
  }
  return '';
});

Template.registerHelper('formatDate', (date) => moment(date).format(CONST.DEFAULT_DATETIME_FORMAT));

Template.registerHelper('formatDecimal', (number) => number.toFixed(2));

Template.registerHelper('formatReservationStatus', (statusCode) => {
  // TODO add i18n
  let displayName;
  switch (statusCode) {
    case CONST.RESERVATION_STATUSES.CANCELLED:
      displayName = 'Annulée';
      break;
    case CONST.RESERVATION_STATUSES.CREATED:
      displayName = 'Créée';
      break;
    case CONST.RESERVATION_STATUSES.ACCEPTED:
      displayName = 'Acceptée';
      break;
    case CONST.RESERVATION_STATUSES.CONFIRMED:
      displayName = 'Confirmée';
      break;
    default:
      displayName = 'Inconnue';
  }

  return displayName;
});
// Template.registerHelper('isChecked', function (key, value) {
//     return key == value ? { selected: 'checked' } : ''
// })
// Template.registerHelper('isSelected', function (key, value) {
//     return key == value ? { selected: 'selected' } : ''
// })
Template.registerHelper('equals', (v1, v2) => v1 === v2);
