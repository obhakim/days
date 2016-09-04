import './contact-item.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.ContactItem.events({
  'change select'(event) {
    event.preventDefault();

    const contactId = this._id;
    const statusId = event.target.value;

    Meteor.call('updateContactStatus', contactId, statusId, (error) => {
      if (error) {
        // Session.set(SESSION.ERROR, error);
        // console.log(error);
      }
    });
  },
});
