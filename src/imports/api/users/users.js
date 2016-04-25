import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Users = Meteor.users;

Users.attachSchema(Users.Schema);

Users.VehicleSchema = new SimpleSchema({
  license: { type: String },
  // vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },
  vehicleTypeId: { label: 'Type de véhicule', type: String, regEx: SimpleSchema.RegEx.Id },
  color: { type: String },
  'photos.$': { type: String },
});

Users.CreditCardSchema = new SimpleSchema({
  num: { type: String },
  validThruM: { type: Number, min: 1, max: 12 },
  validThruY: { type: Number },
  cvv: { type: String },
  name: { type: String },
});

Users.ProfileSchema = new SimpleSchema({
  // gender: {
  //     type: String,
  //     allowedValues: ['M', 'Mme', 'Mlle']
  //     //,optional: true
  // },
  firstName: {
    type: String,
  // ,optional: true
  },
  lastName: {
    type: String,
  // ,optional: true
  },
  birthday: {
    type: Date,
    optional: true,
  },
  phone: {
    type: String,
  // ,optional: true
  },
  vehicle: {
    type: Users.VehicleSchema,
    optional: true,
  },
  creditCard: {
    type: Users.CreditCardSchema,
    optional: true,
  },
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

Users.Schema = new SimpleSchema({
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
    optional: true,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
  },
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
  // registered_emails: {
  //     type: [Object],
  //     optional: true,
  //     blackbox: true
  // },
  createdAt: {
    type: Date,
  },
  profile: {
    type: Users.ProfileSchema,
    optional: true,
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP)
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
    optional: true,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },
});

// Schema.UserCountry = new SimpleSchema({
//     name: {
//         type: String
//     },
//     code: {
//         type: String,
//         regEx: /^[A-Z]{2}$/
//     }
// })
