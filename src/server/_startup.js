BrowserPolicy.content.allowOriginForAll("*.google.com");
BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
BrowserPolicy.content.allowFontDataUrl();

Meteor.startup(function () {
    // code to run on server at startup
    smtp = {
        username: 'foalicensee@outlook.com',   // eg: server@gentlenode.com
        password: 'F0@1icensee',   // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp-mail.outlook.com',  // eg: smtp.live.com 
        port: 587   //25
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    //console.log(process.env.MAIL_URL);
    Accounts.config({
        sendVerificationEmail: true
    });
    
    
    
    // try {
    //     Email.send({
    //         from: "foalicensee@outlook.com",
    //         to: "wkurtsev@gmail.com",
    //         subject: "METEOR TEST",
    //         text: "Meteor test email"
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
    //Helpers.notifyNewReservation('wkurtsev@gmail.com');
});