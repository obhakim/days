<<<<<<< HEAD
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from './constants.js';

export const Helpers = {};

Helpers.isAdmin = function () {
  return Roles.userIsInRole(this.userId, [CONST.USER_ROLES.ADMIN]);
};

Helpers.isDriver = function () {
  return Roles.addUsersToRoles(this.userId,[CONST.USER_ROLES.DRIVER] ); 
  // return Roles.userIsInRole(Meteor.user(), [CONST.USER_ROLES.DRIVER])
  // console.log('isDriver : ' + Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]));
  //return Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]);
};

Helpers.getFullName = function (firstName, lastName) {
  return firstName + ' ' + lastName;
};

if (Meteor.isServer) {
  // Server side helpers

  Helpers.sendEmail = function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.unblock()

    // console.log('sendEmail: '.concat(to, ', ', from, ', ', subject, ', ', text))

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text,
    });
  };

  Helpers.notifyNewReservation = function (email) {
    check(email, String);

    const subject = 'Nouvelle reservation';
    const text = 'Bonjour,\r\n\r\nune nouvelle reservation est disponible.';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationAcceptance = function (email) {
    check(email, String);

    const subject = 'Reservation confirmée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est confirmée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationConfirmation = function (email) {
    check(email, String);

    const subject = 'Reservation effectuée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationCancellation = function (email) {
    check(email, String);

    const subject = 'Reservation annulée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est annulée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };
}
=======
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { CONST } from './constants.js';

export const Helpers = {};

Helpers.isAdmin = function () {
  return Roles.userIsInRole(Meteor.userId(), CONST.USER_ROLES.ADMIN);
};

Helpers.isDriver = function () {
  // console.log(Meteor.userId());
  // console.log(CONST.USER_ROLES.DRIVER);
  // console.log('isDriver : ' + Roles.userIsInRole(Meteor.userId(), 'driver'));
  // console.log(this.userId);
  // console.log('isDriver : ' + Roles.userIsInRole(this.userId, CONST.USER_ROLES.DRIVER));
  return Roles.userIsInRole(Meteor.userId(), CONST.USER_ROLES.DRIVER);
};

Helpers.getFullName = function (firstName, lastName) {
  return firstName + ' ' + lastName;
};

if (Meteor.isServer) {
  // Server side helpers

  Helpers.sendEmail = function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    // this.unblock()

    // console.log('sendEmail: '.concat(to, ', ', from, ', ', subject, ', ', text))

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text,
    });
  };

  Helpers.notifyNewReservation = function (email) {
    check(email, String);

    const subject = 'Nouvelle reservation';
    const text = 'Bonjour,\r\n\r\nune nouvelle reservation est disponible.';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationAcceptance = function (email) {
    check(email, String);

    const subject = 'Reservation confirmée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est confirmée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationConfirmation = function (email) {
    check(email, String);

    const subject = 'Reservation effectuée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };

  Helpers.notifyReservationCancellation = function (email) {
    check(email, String);

    const subject = 'Reservation annulée';
    const text = 'Bonjour,\r\n\r\nVotre reservation est annulée.\r\n\r\nDays';

    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
  };
}
>>>>>>> refs/remotes/origin/master
