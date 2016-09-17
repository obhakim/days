import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from './constants.js';

export const Helpers = {};

Helpers.isAdmin = function isAdmin() { 
  return Roles.userIsInRole(Meteor.userId(), CONST.USER_ROLES.ADMIN);
};

Helpers.isDriver = function isDriver() {  
  return Roles.userIsInRole(Meteor.userId(), CONST.USER_ROLES.DRIVER);
};

Helpers.isDriverOrAdmin = () => Helpers.isAdmin() || Helpers.isDriver();

Helpers.getFullName = (firstName, lastName) => `${firstName} ${lastName}`;

if (Meteor.isServer) {
  // Server side helpers

  Helpers.sendEmail = (to, from, subject, text) => {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.unblock()

    Email.send({
      to,
      from,
      subject,
      text,
    });
  };

  Helpers.notifyNewReservation = (email) => {
    check(email, String);

    const subject = 'Nouvelle reservation';
    const text = 'Bonjour,\r\n\r\nune nouvelle reservation est disponible.';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationAcceptance = (email) => {
    check(email, String);

    const subject = 'Reservation confirmée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est confirmée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationConfirmation = (email) => {
    check(email, String);

    const subject = 'Reservation effectuée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationCancellation = (email) => {
    check(email, String);

    const subject = 'Reservation annulée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est annulée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };
}
