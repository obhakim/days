Meteor.subscribe("reservations");

Template.reservations.helpers({
    reservations: function () {
        return Reservations.find().fetch();
    }
});