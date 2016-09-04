import { Meteor } from 'meteor/meteor';
import { Contacts } from './contacts.js';

Meteor.methods({
  createContact: (request) => {
    Contacts.insert(request);
  },

  updateContactStatus: (contactId, statusId) => {
    Contacts.update(contactId, {
      $set: {
        status: statusId,
      },
    });
  },
});
