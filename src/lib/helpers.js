if (typeof Helpers === 'undefined' || Helpers === null) {
    Helpers = {};
}

Helpers.isDriver = function () {
    //return Roles.userIsInRole(Meteor.user(), [CONST.USER_ROLES.DRIVER]);
    return Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]);
}

if (Meteor.isServer) {
    // Server side helpers
    if (typeof Helpers === 'undefined' || Helpers === null) {
        Helpers = {};
    }

    Helpers.sendEmail = function(to, from, subject, text){
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        //this.unblock();

        //console.log('sendEmail: '.concat(to, ', ', from, ', ', subject, ', ', text));

        Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
        });
    }

    Helpers.notifyNewReservation = function(email){
        check(email, String);
        
        var subject = 'Nouvelle reservation';
        var text = 'Bonjour,/r/nune nouvelle reservation est disponible.';
        
        Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
    }
    
    Helpers.notifyReservationAcceptance = function(email){
        check(email, String);
        
        var subject = 'Reservation confirmée';
        var text = 'Bonjour,/r/nVotre reservation est confirmée./r/n/r/nDays';
        
        Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
    }
    
    Helpers.notifyReservationConfirmation = function(email){
        check(email, String);
        
        var subject = 'Reservation effectuée';
        var text = 'Bonjour,/r/nVotre reservation est effectuée./r/n/r/nDays';
        
        Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
    }
    
    Helpers.notifyReservationCancellation = function(email){
        check(email, String);
        
        var subject = 'Reservation annulée';
        var text = 'Bonjour,/r/nVotre reservation est annulée./r/n/r/nDays';
        
        Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
    }
}