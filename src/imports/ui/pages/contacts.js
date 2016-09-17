import './contacts.html';
import '../components/contact-item.js';
import '../lib/helpers.js';
import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contacts/contacts.js';

Template.Contacts.onCreated(function contactsPageOnCreated() {
  this.autorun(() => {
    this.subscribe('contacts');
  });
});

Template.Contacts.helpers({
  contactList: () => Contacts.find().fetch(),
});
