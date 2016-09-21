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

Helpers.isClient = function isClient() {
  return Roles.userIsInRole(Meteor.userId(), CONST.USER_ROLES.CLIENT);
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
}
