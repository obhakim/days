CONST = {
  VERSION: 'V0.0.1',
  
  DEFAULT_LOCALE: 'fr',
  DEFAULT_DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  
  RESERVATION_STATUS: {
      CREATED: 'Créé',
      CONFIRMED: 'Confirmé',
      CLOSED: 'Clôturé',
      CANCELLED: 'Annulé'
  }  
};

if (Meteor.isServer) {
    CONST.MAIL_FROM = 'no-reply@days.fr';
}