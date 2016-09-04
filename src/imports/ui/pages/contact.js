import './contact.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SESSION } from '../../common/constants.js';


Template.Contact.events({
  'submit #form': function contactSubmitForm(event) {
    event.preventDefault();

    const request = {
      name: event.target.nom.value,
      phone: event.target.telephone.value,
      email: event.target.email.value,
      request: event.target.question.value,
    };

    Meteor.call('createContact', request, (error) => {
      if (error) {
        Session.set(SESSION.ERROR, error);
      } else {
        event.target.reset();
        event.target.nom.focus();
        // TODO: Show confirmation message
      }
    });
  },
});
