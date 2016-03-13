Template.reservationItem.helpers({
  // reservations: function () {
  //     return Reservations.find();
  // }
});

Template.reservationItem.events({
  'click .acceptReservation': function() {
    Meteor.call("acceptReservation", this._id, Meteor.userId(), function(error, result) {
      if (error) {
        // show error
      }
      else {
        //
      }
    });
  },
  'click .confirmReservation': function() {
    Meteor.call("confirmReservation", this._id, function(error, result) {
      if (error) {
        // show error
      }
      else {
        //
      }
    });
  },
  'click .cancelReservation': function() {
    Meteor.call("cancelReservation", this._id, function(error, result) {
      if (error) {
        // show error
      }
      else {
        //
      }
    });
  },
});