Meteor.publish('reservations', function() {
  return Reservations.find({}, {sort: {createdAt: -1}});
});

Meteor.methods({
  createReservation: function(reservation) {
    // check(Meteor.userId(), String);
    // check(activity, {
    //   recipeName: String,
    //   text: String,
    //   image: String
    // });
    // check(tweet, Boolean);
    // check(loc, Match.OneOf(Object, null));
    
    reservation.ownerId = Meteor.userId();
    reservation.ownerName = Meteor.user().profile.name;
    reservation.createdAt = new Date;
    
    var id = Reservations.insert(reservation);
    
    return id;
  }
});