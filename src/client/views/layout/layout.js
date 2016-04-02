Template.layout.helpers({
  version: function () {
    return Meteor.App.VERSION
  },
  fullName: function () {
    return Meteor.user() ? Meteor.user().profile.firstName +
    ' ' + Meteor.user().profile.lastName : ''
  },
  loading: Session.equals(SESSION.ISLOADING, true),
})

Template.layout.rendered = function () {
  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar({ context: $('#body') }).sidebar('attach events', '.toc.item')
}
