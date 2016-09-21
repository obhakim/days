import { Meteor } from 'meteor/meteor';

export const CONST = {
  VERSION: 'V0.0.1',

  DEFAULT_LOCALE: 'fr',
  DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',
  DEFAULT_DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  PAGE_SIZE: 10,

  RESERVATION_STATUSES: {
    CANCELLED: -10,
    PENDING: 0,
    CONFIRMED: 10,
    DONE: 20,
    NOTDONE: 30,
  },

  USER_ROLES: {
    CLIENT: 'client',
    DRIVER: 'driver',
    ADMIN: 'admin',
  },

  CONTACT_REQUEST_STATUSES: {
    OPEN: 0,
    WAITING: 1,
    CLOSED: 2,
  },
};

if (Meteor.isServer) {
  CONST.MAIL_FROM = 'no-reply@days.fr';
}

export const APP = {
  NAME: 'Days',
  DESCRIPTION: 'Drivers At Your Service (Days) VTC application officielle',
};

export const SESSION = {
  ERROR: 'SESSION_ERROR',
  VALIDATION_ERRORS: 'SESSION_VALIDATION_ERRORS',
  GEO_POSITION: 'SESSION_GEO_POSITION',
  ISLOADING: 'SESSION_ISLOADING',
};
