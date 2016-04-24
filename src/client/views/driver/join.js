
Template.driverJoin.helpers({
  validThruM: function () {
    var monthsList = []
    for (var i = 1; i <= 12; i++) {
      monthsList.push({ value: i })
    }
    return monthsList
  },
  validThruY: function () {
    var thisYear = new Date().getFullYear()
    var yearsList = []
    for (var i = 0; i < 5; i++) {
      yearsList.push({ value: thisYear + i })
    }
    return yearsList
  },
  profile: function () {
    return Meteor.user().profile
  },
})

Template.driverJoin.events({
  'submit #form': function (event) {
    // Prevent default browser form submit
    event.preventDefault()

    const data = {
      lastName: event.target.lastname.value,
      firstName: event.target.firstname.value,
      phone: event.target.phone.value,
      // email: event.target.email.value,
      birthday: moment(event.target.birthday.value, CONST.DEFAULT_DATETIME_FORMAT).toDate(),
      creditCard: {
        num: event.target.num.value,
        validThruM: event.target.validThruM.value,
        validThruY: event.target.validThruY.value,
        cvv: event.target.cvv.value,
        name: event.target.name.value,
      }
    }

    Meteor.call('updateUserProfile', data, function (error, result) {
      if (error) {
        var context = Meteor.users.simpleSchema().namedContext('updateUserProfile')
        var errors = context.invalidKeys().map(function (data) { return { message: context.keyErrorMessage(data.name) } })
        Session.set(SESSION.VALIDATION_ERRORS, errors)
      } else {
        FlowRouter.go('/')
      }
    })

    return false
  }
})

Template.driverJoin.onRendered(function () {
  this.$('.datetimepicker').datetimepicker({
    // format: CONST.DEFAULT_DATETIME_FORMAT,
    format: CONST.DEFAULT_DATE_FORMAT,
    // useCurrent: true,
    locale: CONST.DEFAULT_LOCALE,
  // stepping: 5,
  // showTodayButton: true,
  // inline: true,
  // sideBySide: true,
  })
})
