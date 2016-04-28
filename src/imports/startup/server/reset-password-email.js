//import { user } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const smtp = {
    username: 'foalicensee@outlook.com', // eg: server@gentlenode.com
    password: 'F0@1icensee', // eg: 3eeP1gtizk5eziohfervU
    server: 'smtp-mail.outlook.com', // eg: smtp.live.com
    port: 587, // 25
  };

process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port


Accounts.emailTemplates.siteName = 'Days';
Accounts.emailTemplates.from = 'Days <foalicensee@outlook.com>';

Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'Bienvenue ' + user.profile.displayName; //'Reset your password on Meteor Todos';
  },
  text(user, url) {
  return 'Cher ' + user.profile.displayName + ',\n\n' +
    'Cliquez sur le lien suivant pour mettre un nouveau mot de passe :\n' +
    url + '\n\n' +
    "Ne l'oubliez pas!!!\n\n\n" +
    'Cordialement,\nDays';
/*
    return `Hello!

Click the link below to reset your password on Meteor Todos.

${url}

If you didn't request this email, please ignore it.

Thanks,
The Meteor Todos team
`;
*/
  },
//   html(user, url) {
//     return `
//       XXX Generating HTML emails that work across different email clients is a very complicated
//       business that we're not going to solve in this particular example app.
//
//       A good starting point for making an HTML email could be this responsive email boilerplate:
//       https://github.com/leemunroe/responsive-html-email-template
//
//       Note that not all email clients support CSS, so you might need to use a tool to inline
//       all of your CSS into style attributes on the individual elements.
// `
//   }
};
