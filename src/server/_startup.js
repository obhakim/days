Meteor.startup(function () {
    // code to run on server at startup
//     smtp = {
//         username: 'your_username',   // eg: server@gentlenode.com
//         password: 'your_password',   // eg: 3eeP1gtizk5eziohfervU
//         server: 'smtp.gmail.com',  // eg: mail.gandi.net
//         port: 25
//     }
// 
//     process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    Accounts.config({
        sendVerificationEmail: true
    });
    
    // PrePopulate data
    //console.log(VehicleTypes.find().fetch());
    if (!VehicleTypes.findOne()) {
        VehicleTypes.insert({name: "Audi A6"});
        VehicleTypes.insert({name: "Audi A8"});
        VehicleTypes.insert({name: "Mercedes Classe E"});
        VehicleTypes.insert({name: "Mercedes Classe S"});
        VehicleTypes.insert({name: "Caravelle Minibus"});
        VehicleTypes.insert({name: "Mercedes Classe V Minibus"});
    }
});