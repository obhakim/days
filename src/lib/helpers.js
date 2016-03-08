if (typeof Helpers === 'undefined' || Helpers === null) {
    Helpers = {};
}

Helpers.isDriver = function () {
    //return Roles.userIsInRole(Meteor.user(), ['driver']);
    return Roles.userIsInRole(this.userId, ['driver']);
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
        var text = 'Bonjour, une nouvelle reservation est disponible.';
        
        Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);
    }
}