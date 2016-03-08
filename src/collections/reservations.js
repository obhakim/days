//http://docs.meteor.com/#/full/allow
// Reservations.allow({
//     insert: function (userId, doc) {
//         // the user must be logged in, and the document must be owned by the user
//         //console.log('allow insert() userid = '+userId);
//         //console.log('allow insert() doc.ownerId = '+doc.ownerId);
//         //return (userId);
//         return true;
//     },
//     // update: function (userId, doc, fieldNames, modifier) {
//     //     // can only change your own documents
//     //     return (reservation.ownerId === userId || Roles.userIsInRole(Meteor.user(), ['driver', 'admin']));
//     // },
// //   remove: function (userId, doc) {
// //     // can only remove your own documents
// //     return doc.owner === userId;
// //   }
// });

// Reservations.deny({
//   update: function (userId, doc, fields, modifier) {
//     // can't change owners
//     return _.contains(fields, 'owner');
//   },
//   remove: function (userId, doc) {
//     // can't remove locked documents
//     return doc.locked;
//   },
//   fetch: ['locked'] // no need to fetch 'owner'
// });
function getVehicleTypes() {
    return VehicleTypes.find().fetch().map(function (doc) {
        return doc.name;
    });
}

var reservationsSchema = new SimpleSchema({
    lastname: {label: "Nom", type: String},
    firstname: {label: "Prénom", type: String, optional: true},
    phone: {label: "Téléphone", type: String},
    email: {label: "Email", type: String, regEx: SimpleSchema.RegEx.Email},    
    start: {label: "Départ", type: String},
    end: {label: "Destination", type: String},
    startAt: {label: "Le", type: Date},
    //vehicleType: {label: "Type de véhicule", type: Number, defaultValue: 0},
    vehicleType: {label: "Type de véhicule", type: String, allowedValues: getVehicleTypes()},
    price: {label: "Prix", type: Number, decimal: true, defaultValue: 0.00},
    driverId: {label: "Chauffeur", type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    status: {label: "Statut", type: String, defaultValue: CONST.RESERVATION_STATUS.CREATED},
    ownerId: {label: "Id Client", type: String, denyUpdate: true,
        autoValue: function() {
            if ( this.isInsert ) {
                return Meteor.userId() || 0;
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId() || 0};
            } else {
                this.unset();
            }
        }},
    ownerName: {label: "Client", type: String, denyUpdate: true,
        autoValue: function() {
            console.log('{SimpleSchema ownerName} username = '+Meteor.user().username);
            console.log('{SimpleSchema ownerName} lastname = '+ this.field('lastname').value);
            if ( this.isInsert ) {
                return Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value;
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value};
            } else {
                this.unset();
            }
        }},
    createdAt: {label: "Réservé le", type: Date, denyUpdate: true, 
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();
            } 
        }}
});

Reservations.attachSchema(reservationsSchema);

if(Meteor.isClient) {
    // Update allowed values on client when VehicleTypes gets loaded
    Tracker.autorun(function () {
        Reservations._c2._simpleSchema._schema.vehicleType.allowedValues = getVehicleTypes();
    });
}


if(Meteor.isServer) {
    // Send emails to drivers
    Reservations.after.insert(function (userId, doc) {
        _.each(Meteor.users.find({}, { fields: { 'emails': 1 } }).fetch(), function (user) { Helpers.notifyNewReservation(user.emails[0].address); });
    });
}


// Define a namespace for Methods related to the Reservations collection
// Allows overriding for tests by replacing the implementation (2)
Reservations.methods = {};

Reservations.methods.insert = new ValidatedMethod({
  name: 'Reservations.methods.insert',
  // Factor out validation so that it can be run independently (1)
  validate: reservationsSchema.validator(),
  // Factor out Method body so that it can be called independently (3)
  run(newReservation) {
    var id = Reservations.insert(newReservation);
    return id;
  }
});

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
