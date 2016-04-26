UI.registerHelper('isLoggedIn', function () {
  return !!Meteor.user()
})
UI.registerHelper('currentUserEmail', function () {
  if (Meteor.user()) {
    return Meteor.user().emails[0].address
  }
})
UI.registerHelper('formatDate', function (date) {
  return moment(date).format(CONST.DEFAULT_DATETIME_FORMAT)
})
// UI.registerHelper('isChecked', function(key, value) {
//     return key == value ? { selected: 'checked' } : ''
// })
// UI.registerHelper('isSelected', function(key, value) {
//     return key == value ? { selected: 'selected' } : ''
// })
UI.registerHelper('equals', function (v1, v2) {
  return v1 === v2
})
