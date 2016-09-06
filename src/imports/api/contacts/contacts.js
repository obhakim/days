import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';
import { CONST } from '../../common/constants.js';

export const Contacts = new Mongo.Collection('contacts');

Contacts.schema = new SimpleSchema({
  name: {
    label: 'Nom',
    type: String,
  },
  phone: {
    label: 'Téléphone',
    type: String,
    optional: true,
  },
  email: {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
  request: {
    label: 'Message',
    type: String,
  },
  status: {
    label: 'Statut',
    type: Number,
    optional: true,
    allowedValues: [
      CONST.CONTACT_REQUEST_STATUSES.OPEN,
      CONST.CONTACT_REQUEST_STATUSES.WAITING,
      CONST.CONTACT_REQUEST_STATUSES.CLOSED,
    ],
    defaultValue: 0,
  },
});

Contacts.attachSchema(Contacts.schema);
