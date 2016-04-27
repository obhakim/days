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
// Template.registerHelper('isChecked', function(key, value) {
//     return key == value ? { selected: 'checked' } : ''
// })
// Template.registerHelper('isSelected', function(key, value) {
//     return key == value ? { selected: 'selected' } : ''
// })
Template.registerHelper('equals', function (v1, v2) {
  return v1 === v2;
});
