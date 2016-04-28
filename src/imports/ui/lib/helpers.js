import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CONST } from '../../common/constants.js';
import { moment } from 'meteor/momentjs:moment';


Template.registerHelper('isLoggedIn', function () {
  return !!Meteor.user();
});

Template.registerHelper('currentUserEmail', function () {
  if (Meteor.user()) {
    return Meteor.user().emails[0].address;
  }
  return '';
});

Template.registerHelper('formatDate', function (date) {
  return moment(date).format(CONST.DEFAULT_DATETIME_FORMAT);
});

Template.registerHelper('formatDecimal', function (number) {
  return number.toFixed(2);
});

Template.registerHelper('formatReservationStatus', function (statusCode) {
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
// Template.registerHelper('isChecked', function(key, value) {
//     return key == value ? { selected: 'checked' } : ''
// })
// Template.registerHelper('isSelected', function(key, value) {
//     return key == value ? { selected: 'selected' } : ''
// })
Template.registerHelper('equals', function(v1, v2) {
  return v1 === v2;
});
