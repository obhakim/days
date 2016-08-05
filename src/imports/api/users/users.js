import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { CONST } from '../../common/constants.js';

export const Users = Meteor.users;

Users.creditCardSchema = new SimpleSchema({
  num: {
    type: String,
    label: "numero",
  },
  validThruM: {
    type: String,
    label: "mois",
    min: 1,
    max: 12,
  },
  validThruY: {
    type: String,
    label: "annee",
  },
  cvv: {
    type: String,
    label: "CVV",
  },
  name: {
    type: String,
    label: "Nom",
  },
});

Users.profileSchema = new SimpleSchema({
  lastName: {
    type: String,
    label: "Prenom",
    optional: true,
  },
  firstName: {
    type: String,
    label: "Nom",
    optional: true,
  },
  birthday: {
    type: Date,
    label: "Date de naissance",
    optional: true,
  },
  phone: {
    type: String,
    label: "phone",
    optional: true,
  },
  street: {
    type: String,
    label: "Rue",
  },
  city: {
    type: String,
    label: "Ville",
  },
  zipcode: {
    type: String,
    label: "Code postale",
  },
  creditCard: {
    type: Users.creditCardSchema,
    optional: true,
  },
});

Users.schema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  // For accounts-password, either emails or username is required, but not both. It is OK to make this
  // optional here because the accounts-password package does its own validation.
  // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
  },
  password: {
    type: String,
  //optional: true,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  emails: {
    type: Array,
  // For accounts-password, either emails or username is required, but not both. It is OK to make this
  // optional here because the accounts-password package does its own validation.
  // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
  //optional: true,
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
    optional: true,
    label: "Date de creation",
  },
  profile: {
    type: Users.profileSchema,
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
    allowedValues: [CONST.USER_ROLES.CLIENT, CONST.USER_ROLES.DRIVER, CONST.USER_ROLES.ADMIN],
    defaultValue: CONST.USER_ROLES.CLIENT,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },
});

Meteor.users.attachSchema(Users.schema);
