Schema = {};

Schema.getVehicleTypes = function getVehicleTypes() {
    return VehicleTypes.find().fetch().map(function (doc) {
        return doc.name;
    });
}

Schema.VehicleType = new SimpleSchema({
    name: { label: "Type de véhicule", type: String },
    rate: { label: "Tarif", type: Number, decimal: true }
});

// Schema.UserCountry = new SimpleSchema({
//     name: {
//         type: String
//     },
//     code: {
//         type: String,
//         regEx: /^[A-Z]{2}$/
//     }
// });

Schema.Vehicle = new SimpleSchema({
    license: { type: String },
    vehicleType: {label: "Type de véhicule", type: String, allowedValues: Schema.getVehicleTypes()},
    color: { type: String },
    "photos.$": { type: String }
});

Schema.CreditCard = new SimpleSchema({
    num: { type: String },
    validThru: { type: String },
    cvv: { type: String },
    name: { type: String }
});

Schema.Profile = new SimpleSchema({
    // gender: {
    //     type: String,
    //     allowedValues: ['M', 'Mme', 'Mlle']
    //     //,optional: true
    // },
    firstName: {
        type: String
        //,optional: true
    },
    lastName: {
        type: String
        //,optional: true
    },
    birthday: {
        type: Date
        ,optional: true
    },
    phone: {
        type: String
        //,optional: true
    },
    vehicle: {
        type: Schema.Vehicle
        ,optional: true
    },
    creditCard: {
      type: Schema.CreditCard
      ,optional: true
    }
    // website: {
    //     type: String,
    //     regEx: SimpleSchema.RegEx.Url,
    //     optional: true
    // },
    // country: {
    //     type: Schema.UserCountry,
    //     optional: true
    // }
});

Schema.User = new SimpleSchema({
    // username: {
    //     type: String,
    //     // For accounts-password, either emails or username is required, but not both. It is OK to make this
    //     // optional here because the accounts-password package does its own validation.
    //     // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    //     optional: true
    // },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    // registered_emails: {
    //     type: [Object],
    //     optional: true,
    //     blackbox: true
    // },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.Profile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Schema.Reservation = new SimpleSchema({
    lastname: {label: "Nom", type: String},
    firstname: {label: "Prénom", type: String, optional: true},
    phone: {label: "Téléphone", type: String},
    email: {label: "Email", type: String, regEx: SimpleSchema.RegEx.Email},    
    start: {label: "Départ", type: String},
    end: {label: "Destination", type: String},
    startAt: {label: "Le", type: Date},
    //vehicleType: {label: "Type de véhicule", type: Number, defaultValue: 0},
    vehicleType: {label: "Type de véhicule", type: String, allowedValues: Schema.getVehicleTypes()},
    price: {label: "Prix", type: Number, decimal: true, defaultValue: 0.00, min: 0},
    driverId: {label: "Chauffeur", type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    status: {label: "Statut", type: Number, defaultValue: CONST.RESERVATION_STATUSES.CREATED},
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
            //console.log('{SimpleSchema ownerName} username = '+Meteor.user().username);
            //console.log('{SimpleSchema ownerName} lastname = '+ this.field('lastname').value);
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