import { AccountsTemplates } from 'meteor/useraccounts:core';
import { T9n } from 'meteor/softwarerero:accounts-t9n';
//import { TAPi18n } from 'meteor/tap:i18n';

// AccountsTemplates.configure({
//   showForgotPasswordLink: true,
//   texts: {
//     errors: {
//       loginForbidden: TAPi18n.__('Incorrect username or password'),
//       pwdMismatch: TAPi18n.__('Passwords don\'t match'),
//     },
//     title: {
//       signIn: TAPi18n.__('Sign In'),
//       signUp: TAPi18n.__('Join'),
//     },
//   },
//   defaultTemplate: 'Auth_page',
//   defaultLayout: 'App_body',
//   defaultContentRegion: 'main',
//   defaultLayoutRegions: {},
// });

T9n.setLanguage('fr');

T9n.map('fr', {
  'Required Field': 'Champ obligatoire',
  'Invalid email': 'Email non-valide',
  'Minimum required length: 6': 'Au moins 6 caractères',
  'Minimum required length: 5': 'Au moins 5 caractères',
  error: {
    accounts: {
      'Login forbidden': 'Connexion interdite',
    },
  },
});

// Accounts.config({
//   sendVerificationEmail: true,
// });

// Options
AccountsTemplates.configure({
  defaultLayout: 'Layout',
  // defaultLayoutRegions: {
  //   nav: 'nav',
  //   footer: 'footer',
  // },
  defaultContentRegion: 'content',
  showForgotPasswordLink: true,
  //overrideLoginErrors: true,
  enablePasswordChange: true,

  sendVerificationEmail: true,
  // enforceEmailVerification: true,
  // confirmPassword: true,
  // continuousValidation: false,
  // displayFormLabels: true,
  // forbidClientAccountCreation: true,
  // formValidationFeedback: true,
  // homeRoutePath: '/',
  // showAddRemoveServices: false,
  // showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

// Privacy Policy and Terms of Use
// privacyUrl: 'privacy',
// termsUrl: 'terms-of-use',
});

AccountsTemplates.addFields([
  {
    _id: 'firstName',
    type: 'text',
    displayName: 'Prénom',
    placeholder: 'Prénom',
    required: true,
  },
  {
    _id: 'lastName',
    type: 'text',
    displayName: 'Nom',
    placeholder: 'Nom',
    required: true,
  },
  // {
  //   _id: 'birthday',
  //   type: 'text',
  //   displayName: 'Date de naissance',
  //   required: false
  // },
  {
    _id: 'phone',
    type: 'tel',
    displayName: 'Téléphone',
    placeholder: 'Téléphone',
    required: true,
    minLength: 6,
    // re: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
    re: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    errStr: 'Téléphone non-valide',
  },
// {
//   _id: 'role',
//   type: 'radio',
//   displayName: 'S'enregistrer comme',
//   select: [
//     {
//       text: 'Client',
//       value: CONST.USER_ROLES.CLIENT,
//     }, {
//       text: 'Chauffeur',
//       value: CONST.USER_ROLES.DRIVER,
//     }
//   ],
// },
// {
//   _id: 'license',
//   type: 'text',
//   displayName: 'Immatriculation',
//   //required: true,
// },
// {
//   _id: 'vehicleType',
//   type: 'select',
//   displayName: 'Type de véhicule',
//   //required: true,
//   // select: function () {
//   //   return VehicleTypes.find().fetch().map(function (doc) {
//   //     return doc.name
//   //   })
//   // },
// },
// {
//   _id: 'color',
//   type: 'text',
//   displayName: 'Couleur',
//   //required: true,
// },
// {
//   _id: 'photo',
//   type: 'text',
//   displayName: 'Photo',
//   //required: true,
// },
// {
//   _id: 'number',
//   type: 'text',
//   displayName: 'Numéro',
//   //required: true,
// },
// {
//   _id: 'validThru',
//   type: 'text',
//   displayName: 'Validité',
//   //required: true,
// },
// {
//   _id: 'cvv',
//   type: 'text',
//   displayName: 'CVV',
//   //required: true,
// },
// {
//   _id: 'name',
//   type: 'text',
//   displayName: 'Nom',
//   //required: true,
// },
]);
