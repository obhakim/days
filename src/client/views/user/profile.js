Template.profile.helpers({
    validThruY: function() {
        var thisYear = new Date().getFullYear();
        var yearsList = [];
        for (var i = 0; i < 5; i++) {
            yearsList.push({ value: thisYear + i });
        }
        return yearsList;
    },
    profile: function() {
        return Meteor.user().profile;
    },
});

Template.profile.events({
    "submit #form": function(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const data = {
            lastname: event.target.lastname.value,
            firstname: event.target.firstname.value,
            phone: event.target.phone.value,
            email: event.target.email.value,
            birthday: event.target.birthday.value,
            creditCard: {
                num: event.target.num.value,
                validThruM: event.target.validThruM.value,
                validThruY: event.target.validThruY.value,
                cvv: event.target.cvv.value,
                name: event.target.name.value,
            }
        };

        Meteor.call("updateUserProfile", data, function(error, result) {
            if (error) {
                var context = Reservations.simpleSchema().namedContext('updateUserProfile');
                var errors = context.invalidKeys().map(function(data) { return { message: context.keyErrorMessage(data.name) } });
                Session.set(SESSION.VALIDATION_ERRORS, errors);
            }
            else {
                FlowRouter.go('/');
            }
        });

        return false;
    }
});

Template.profile.onRendered(function() {
    var self = this;

    this.$('.datetimepicker').datetimepicker({
        //format: CONST.DEFAULT_DATETIME_FORMAT,
        format: CONST.DEFAULT_DATE_FORMAT,
        useCurrent: true,
        locale: CONST.DEFAULT_LOCALE,
        //stepping: 5,
        showTodayButton: true,
        //inline: true,
        //sideBySide: true,
    });
});