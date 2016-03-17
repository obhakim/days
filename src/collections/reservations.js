Reservations.attachSchema(Schema.Reservation);

if(Meteor.isClient) {
    // Update allowed values on client when VehicleTypes gets loaded
    Tracker.autorun(function () {
        Reservations._c2._simpleSchema._schema.vehicleType.allowedValues = getVehicleTypes();
    });
}


// if(Meteor.isServer) {
//     // Send emails to drivers
//     Reservations.after.insert(function (userId, doc) {
//         _.each(Meteor.users.find({}, { fields: { 'emails': 1 } }).fetch(), function (user) { Helpers.notifyNewReservation(user.emails[0].address); });
//     });
// }

Meteor.methods({
  createReservation: function(reservation) {  
    reservation.ownerId = Meteor.userId();
    reservation.ownerName = Meteor.user().profile ? Meteor.user().profile.name : '';
    reservation.createdAt = new Date;
    
    var id = Reservations.insert(reservation, {validationContext: 'createReservation'});
    
    if(Meteor.isServer) {
      // Send notification
      _.each(Meteor.users.find({}, { fields: { 'emails': 1 } }).fetch(), function (user) { Helpers.notifyNewReservation(user.emails[0].address); });
    }
    
    return id;
  },
  acceptReservation: function(reservationId, userId) {
    // Logged user    
    if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', 'Vous n\'etes pas authorizes d\'effectuer cette action');
    // Driver or Admin only  
    // Get reservation
    var r = Reservations.findOne(reservationId);
    if (!r) throw new Meteor.Error('not-found', 'Le document n\'a pas été trouvé');
    // Only created may be accepted
    if (r.status > CONST.RESERVATION_STATUSES.CREATED) throw new Meteor.Error('not-applicable', 'N\'est pas applicable');
    
    var id = Reservations.update(reservationId, {
        $set: {
          status: CONST.RESERVATION_STATUSES.ACCEPTED,
          driverId: userId  // Preparing "assign to driver"
        }
      }, {
        validationContext: 'acceptReservation'
      });
    
    if(Meteor.isServer) {
      // Send notification
      try {
        Helpers.notifyReservationAcceptance(r.email);
      } catch (error) {
        //throw error;
        console.log(error);
      }
    }
    
    return id;
  },
  confirmReservation: function(reservationId, userId) {
    // Logged user    
    if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', 'Vous n\'etes pas authorizes d\'effectuer cette action');
    // Driver or Admin only  
    // Get reservation
    var r = Reservations.findOne(reservationId);
    if (!r) throw new Meteor.Error('not-found', 'Le document n\'a pas été trouvé');
    // Only accepted may be confirmed
    if (r.status > CONST.RESERVATION_STATUSES.ACCEPTED) throw new Meteor.Error('not-applicable', 'N\'est pas applicable');
    
    var id = Reservations.update(reservationId, {
        $set: {
          status: CONST.RESERVATION_STATUSES.CONFIRMED
        }
      }, {
        validationContext: 'confirmReservation'
      });
    
    if(Meteor.isServer) {
      // Send notification
      try {
        Helpers.notifyReservationConfirmation(r.email);
      } catch (error) {
        //throw error;
        console.log(error);
      }
    }
    
    return id;
  },
  cancelReservation: function(reservationId, userId) {
    // Logged user    
    if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', 'Vous n\'etes pas authorizes d\'effectuer cette action');
    // Driver or Admin only  
    // Get reservation
    var r = Reservations.findOne(reservationId);
    if (!r) throw new Meteor.Error('not-found', 'Le document n\'a pas été trouvé');

    var id = Reservations.update(reservationId, {
        $set: {
          status: CONST.RESERVATION_STATUSES.CANCELLED
        }
      }, {
        validationContext: 'cancelReservation'
      });
    
    if(Meteor.isServer) {
      // Send notification
      try {
        Helpers.notifyReservationCancellation(r.email);
      } catch (error) {
        //throw error;
        console.log(error);
      }
    }
    
    return id;
  },
});





// // Define a namespace for Methods related to the Reservations collection
// // Allows overriding for tests by replacing the implementation (2)
// Reservations.methods = {};

// Reservations.methods.insert = new ValidatedMethod({
//   name: 'Reservations.methods.insert',
//   // Factor out validation so that it can be run independently (1)
//   validate: Reservations.schema.validator(),
//   // Factor out Method body so that it can be called independently (3)
//   run(newReservation) {
//       newReservation.price = -11;
//     var id = Reservations.insert(newReservation, {validationContext: 'Reservations.methods.insert'});
//     return id;
//   }
// });

// Reservations.methods.confirm = new ValidatedMethod({
//   name: 'Reservations.methods.confirm',
//   // Factor out validation so that it can be run independently (1)
//   validate: Reservations.schema.validator(),
//   // Factor out Method body so that it can be called independently (3)
//   run(newReservation) {
//       newReservation.price = -11;
//     var id = Reservations.insert(newReservation, {validationContext: 'Reservations.methods.insert'});
//     return id;
//   }
// });

// // This Method encodes the form validation requirements.
// // By defining them in the Method, we do client and server-side
// // validation in one place.
// Reservations.methods.insert = new ValidatedMethod({
//   name: 'Invoices.methods.insert',
//   validate: new SimpleSchema({
//     email: { type: String, regEx: SimpleSchema.RegEx.Email },
//     description: { type: String, min: 5 },
//     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }
//   }).validator(),
//   run(newInvoice) {
//     // In here, we can be sure that the newInvoice argument is
//     // validated.
// 
//     if (!this.userId) {
//       throw new Meteor.Error('Invoices.methods.insert.not-logged-in',
//         'Must be logged in to create an invoice.');
//     }
// 
//     Reservations.insert(newInvoice)
//   }
// });
// 
// Todos.methods.updateText = new ValidatedMethod({
//   name: 'Todos.methods.updateText',
//   validate: new SimpleSchema({
//     todoId: { type: String },
//     newText: { type: String }
//   }).validator(),
//   run({ todoId, newText }) {
//     const todo = Todos.findOne(todoId);
// 
//     if (!todo.editableBy(this.userId)) {
//       throw new Meteor.Error('Todos.methods.updateText.unauthorized',
//         'Cannot edit todos in a private list that is not yours');
//     }
// 
//     Todos.update(todoId, {
//       $set: { text: newText }
//     });
//   }
// });

// Meteor.methods({
//   createReservation: function(reservation) {
//     // check(Meteor.userId(), String);
//     // check(activity, {
//     //   recipeName: String,
//     //   text: String,
//     //   image: String
//     // });
//     // check(tweet, Boolean);
//     // check(loc, Match.OneOf(Object, null));
//     
//     reservation.ownerId = Meteor.userId();
//     reservation.ownerName = Meteor.user().profile.name;
//     reservation.createdAt = new Date;
//     
//     var id = Reservations.insert(reservation);
//     
//     return id;
//   }
// });
