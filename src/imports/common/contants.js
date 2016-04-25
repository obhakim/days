import { Meteor } from 'meteor/meteor';

export const CONST = {
  VERSION: 'V0.0.1',

  DEFAULT_LOCALE: 'fr',
  DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',
  DEFAULT_DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',

  RESERVATION_STATUSES: {
    CANCELLED: -10,
    CREATED: 0,
    ACCEPTED: 10,
    CONFIRMED: 20,
  },

  USER_ROLES: {
    CLIENT: 'client',
    DRIVER: 'driver',
    ADMIN: 'admin',
  },
};

if (Meteor.isServer) {
  CONST.MAIL_FROM = 'no-reply@days.fr';
}
