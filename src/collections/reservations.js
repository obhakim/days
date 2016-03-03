//http://docs.meteor.com/#/full/allow
Reservations.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        //console.log('allow insert() userid = '+userId);
        //console.log('allow insert() doc.ownerId = '+doc.ownerId);
        return (userId);
    },
    update: function (userId, doc, fieldNames, modifier) {
        // can only change your own documents
        return (reservation.ownerId === userId || Roles.userIsInRole(Meteor.user(), ['driver']));
    },
//   remove: function (userId, doc) {
//     // can only remove your own documents
//     return doc.owner === userId;
//   }
});

Reservations.attachSchema(new SimpleSchema({
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
                return Meteor.userId();
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.userId()};
            } else {
                this.unset();
            }
        }},
    ownerName: {label: "Client", type: String, denyUpdate: true,
        autoValue: function() {
            if ( this.isInsert ) {
                return Meteor.user().username || '';
            } else if (this.isUpsert) {
                return {$setOnInsert: Meteor.user().username || ''};
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
}));

function getVehicleTypes() {
    // console.log(VehicleTypes.find().map(function (doc) {
    //     return doc.name;
    // }));    
    return VehicleTypes.find().fetch().map(function (doc) {
        return doc.name;
    });
}

if(Meteor.isClient) {
    Tracker.autorun(function () {
        Reservations._c2._simpleSchema._schema.vehicleType.allowedValues = getVehicleTypes();
    });
}

if(Meteor.isServer) {
    Reservations.after.insert(function (userId, doc) {
        var drivers = VehicleTypes.find();
    });
}


//console.log('lib\\collections\\reservation Reservations=');
//console.log(Reservations);

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