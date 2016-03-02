Meteor.startup(function () {
    // code to run on server at startup
    smtp = {
        username: 'foalicensee@outlook.com',   // eg: server@gentlenode.com
        password: 'F0@1icensee',   // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.live.com',  // eg: mail.gandi.net
        port: 25   //465
    };

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
    console.log(process.env.MAIL_URL);
    // Accounts.config({
    //     sendVerificationEmail: true
    // });
    
    // PrePopulate data
    //console.log(VehicleTypes.find().fetch());
    if (!VehicleTypes.findOne()) {
        VehicleTypes.insert({name: "Audi A6"});
        VehicleTypes.insert({name: "Audi A8"});
        VehicleTypes.insert({name: "Mercedes Classe E"});
        VehicleTypes.insert({name: "Mercedes Classe S"});
        VehicleTypes.insert({name: "Caravelle Minibus"});
        VehicleTypes.insert({name: "Mercedes Classe V Minibus"});
    };
    
    // Email.send({
    //     from: "wkurtsev@hotmail.fr",
    //     to: "wkurtsev@gmail.com",
    //     subject: "METEOR TEST",
    //     text: "Meteor test email"
    // });
});



