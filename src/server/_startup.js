Meteor.startup(function () {
  // code to run on server at startup
  smtp = {
    username: 'foalicensee@outlook.com', // eg: server@gentlenode.com
    password: 'F0@1icensee', // eg: 3eeP1gtizk5eziohfervU
    server: 'smtp-mail.outlook.com', // eg: smtp.live.com 
    port: 587 // 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port
  // console.log(process.env.MAIL_URL)

  Accounts.emailTemplates.siteName = 'Days'
  Accounts.emailTemplates.from = 'Days <foalicensee@outlook.com>'
  Accounts.emailTemplates.resetPassword.subject = function (user) {
    return 'Bienvenue ' + user.profile.displayName
  }

  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = 'Days'
    // var president = President.findOne()
    // if (president)
    //    president = Meteor.users.findOne(president.presidentId)
    //    signature = president.profile.displayName + ", the MySite President."

    return 'Cher ' + user.profile.displayName + ',\n\n' +
    'Cliquez sur le lien suivant pour mettre un nouveau mot de passe :\n' +
    url + '\n\n' +
    "Ne l'oubliez pas!!!\n\n\n" +
    'Cordialement,\n' +
    signature
  }

// try {
//     Email.send({
//         from: "foalicensee@outlook.com",
//         to: "wkurtsev@gmail.com",
//         subject: "METEOR TEST",
//         text: "Meteor test email"
//     })
// } catch (error) {
//     console.log(error)
// }
// Helpers.notifyNewReservation('wkurtsev@gmail.com')
})
