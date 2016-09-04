import { Meteor } from 'meteor/meteor';
import { Contacts } from '../contacts.js';

Meteor.publish('contacts', function publishContacts() {
  // TODO : add security
  return Contacts.find();
});
