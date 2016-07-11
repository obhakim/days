var require = meteorInstall({"lib":{"_contants.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/_contants.js                                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
CONST = {                                                                                                           // 1
  VERSION: 'V0.0.1',                                                                                                // 2
                                                                                                                    //
  DEFAULT_LOCALE: 'fr',                                                                                             // 4
  DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',                                                                                // 5
  DEFAULT_DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',                                                                      // 6
                                                                                                                    //
  RESERVATION_STATUSES: {                                                                                           // 8
    CANCELLED: -10,                                                                                                 // 9
    CREATED: 0,                                                                                                     // 10
    ACCEPTED: 10,                                                                                                   // 11
    CONFIRMED: 20                                                                                                   // 12
  },                                                                                                                //
                                                                                                                    //
  USER_ROLES: {                                                                                                     // 15
    CLIENT: 'client',                                                                                               // 16
    DRIVER: 'driver',                                                                                               // 17
    ADMIN: 'admin'                                                                                                  // 18
  }                                                                                                                 //
};                                                                                                                  //
                                                                                                                    //
if (Meteor.isServer) {                                                                                              // 22
  CONST.MAIL_FROM = 'no-reply@days.fr';                                                                             // 23
}                                                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_startup.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/_startup.js                                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.startup(function () {                                                                                        // 1
  // common client / server startup                                                                                 //
                                                                                                                    //
  // TODO: replace with i18n                                                                                        //
  // Translate validation messages                                                                                  //
  SimpleSchema.messages({                                                                                           // 6
    required: '[label] est obligatoire',                                                                            // 7
    minString: "[label] doit être d'au moins [min] caractères",                                                     // 8
    maxString: '[label] ne peut pas dépasser [max] caractères',                                                     // 9
    minNumber: '[label] doit être au moins [min]',                                                                  // 10
    maxNumber: '[label] ne peut pas dépasser [max]',                                                                // 11
    minDate: '[label] doit être le ou après [min]',                                                                 // 12
    maxDate: '[label] ne peut pas être après [max]',                                                                // 13
    badDate: "[label] n'est pas une date valide",                                                                   // 14
    minCount: 'Vous devez spécifier au moins [minCount] valeurs',                                                   // 15
    maxCount: 'Vous ne pouvez pas spécifier plus de [maxCount] valeurs',                                            // 16
    noDecimal: '[label] doit être un entier',                                                                       // 17
    notAllowed: '[value] est une valeur non autorisée',                                                             // 18
    expectedString: '[label] doit être une chaîne de caractères',                                                   // 19
    expectedNumber: '[label] doit être un chiffre',                                                                 // 20
    expectedBoolean: '[label] doit être un booléen',                                                                // 21
    expectedArray: '[label] doit être un tableau',                                                                  // 22
    expectedObject: '[label] doit être un objet',                                                                   // 23
    expectedConstructor: '[label] doit être un [type]',                                                             // 24
    regEx: [{ msg: "[label] échec de la validation de l'expression régulière" }, { exp: SimpleSchema.RegEx.Email, msg: '[label] doit être une adresse e-mail valide' }, { exp: SimpleSchema.RegEx.WeakEmail, msg: '[label] doit être une adresse e-mail valide' }, { exp: SimpleSchema.RegEx.Domain, msg: '[label] doit être un nom de domaine valide' }, { exp: SimpleSchema.RegEx.WeakDomain, msg: '[label] doit être un nom de domaine valide' }, { exp: SimpleSchema.RegEx.IP, msg: '[label] doit être une adresse IPv4 ou IPv6 valide' }, { exp: SimpleSchema.RegEx.IPv4, msg: '[label] doit être une adresse IPv4 valide' }, { exp: SimpleSchema.RegEx.IPv6, msg: '[label] doit être une adresse IPv6 valide' }, { exp: SimpleSchema.RegEx.Url, msg: '[label] doit être une URL valide' }, { exp: SimpleSchema.RegEx.Id, msg: '[label] doit être un ID alphanumérique valide' }],
    keyNotInSchema: "[key] n'est pas autorisé par le schéma"                                                        // 37
  });                                                                                                               //
  // Defaults                                                                                                       //
  // SimpleSchema.messages({                                                                                        //
  //     required: "[label] is required",                                                                           //
  //     minString: "[label] must be at least [min] characters",                                                    //
  //     maxString: "[label] cannot exceed [max] characters",                                                       //
  //     minNumber: "[label] must be at least [min]",                                                               //
  //     maxNumber: "[label] cannot exceed [max]",                                                                  //
  //     minDate: "[label] must be on or after [min]",                                                              //
  //     maxDate: "[label] cannot be after [max]",                                                                  //
  //     badDate: "[label] is not a valid date",                                                                    //
  //     minCount: "You must specify at least [minCount] values",                                                   //
  //     maxCount: "You cannot specify more than [maxCount] values",                                                //
  //     noDecimal: "[label] must be an integer",                                                                   //
  //     notAllowed: "[value] is not an allowed value",                                                             //
  //     expectedString: "[label] must be a string",                                                                //
  //     expectedNumber: "[label] must be a number",                                                                //
  //     expectedBoolean: "[label] must be a boolean",                                                              //
  //     expectedArray: "[label] must be an array",                                                                 //
  //     expectedObject: "[label] must be an object",                                                               //
  //     expectedConstructor: "[label] must be a [type]",                                                           //
  //     regEx: [                                                                                                   //
  //         {msg: "[label] failed regular expression validation"},                                                 //
  //         {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},                        //
  //         {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},                    //
  //         {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},                               //
  //         {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},                           //
  //         {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},                     //
  //         {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},                           //
  //         {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},                           //
  //         {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},                                     //
  //         {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}                           //
  //     ],                                                                                                         //
  //     keyNotInSchema: "[key] is not allowed by the schema"                                                       //
  // })                                                                                                             //
});                                                                                                                 // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/accounts.js                                                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
T9n.setLanguage('fr');                                                                                              // 1
                                                                                                                    //
if (Meteor.isClient) {                                                                                              // 3
  T9n.map('fr', {                                                                                                   // 4
    'Required Field': 'Champ obligatoire',                                                                          // 5
    'Invalid email': 'Email non-valide',                                                                            // 6
    'Minimum required length: 6': 'Au moins 6 caractères',                                                          // 7
    'Minimum required length: 5': 'Au moins 5 caractères',                                                          // 8
    error: {                                                                                                        // 9
      accounts: {                                                                                                   // 10
        'Login forbidden': 'Connexion interdite'                                                                    // 11
      }                                                                                                             //
    }                                                                                                               //
  });                                                                                                               //
}                                                                                                                   //
                                                                                                                    //
Accounts.config({                                                                                                   // 17
  sendVerificationEmail: true                                                                                       // 18
});                                                                                                                 //
                                                                                                                    //
// Options                                                                                                          //
AccountsTemplates.configure({                                                                                       // 22
  defaultLayout: 'layout',                                                                                          // 23
  // defaultLayoutRegions: {                                                                                        //
  //   nav: 'nav',                                                                                                  //
  //   footer: 'footer',                                                                                            //
  // },                                                                                                             //
  defaultContentRegion: 'content',                                                                                  // 28
  showForgotPasswordLink: true,                                                                                     // 29
  overrideLoginErrors: true,                                                                                        // 30
  enablePasswordChange: true,                                                                                       // 31
                                                                                                                    //
  // sendVerificationEmail: true,                                                                                   //
  // enforceEmailVerification: true,                                                                                //
  // confirmPassword: true,                                                                                         //
  // continuousValidation: false,                                                                                   //
  // displayFormLabels: true,                                                                                       //
  // forbidClientAccountCreation: true,                                                                             //
  // formValidationFeedback: true,                                                                                  //
  // homeRoutePath: '/',                                                                                            //
  // showAddRemoveServices: false,                                                                                  //
  // showPlaceholders: true,                                                                                        //
                                                                                                                    //
  negativeValidation: true,                                                                                         // 44
  positiveValidation: true,                                                                                         // 45
  negativeFeedback: false,                                                                                          // 46
  positiveFeedback: true                                                                                            // 47
                                                                                                                    //
});                                                                                                                 //
                                                                                                                    //
// Privacy Policy and Terms of Use                                                                                  //
// privacyUrl: 'privacy',                                                                                           //
// termsUrl: 'terms-of-use',                                                                                        //
AccountsTemplates.addFields([{                                                                                      // 54
  _id: 'firstName',                                                                                                 // 56
  type: 'text',                                                                                                     // 57
  displayName: 'Prénom',                                                                                            // 58
  placeholder: 'Prénom',                                                                                            // 59
  required: true                                                                                                    // 60
}, {                                                                                                                //
  _id: 'lastName',                                                                                                  // 63
  type: 'text',                                                                                                     // 64
  displayName: 'Nom',                                                                                               // 65
  placeholder: 'Nom',                                                                                               // 66
  required: true                                                                                                    // 67
},                                                                                                                  //
// {                                                                                                                //
//   _id: 'birthday',                                                                                               //
//   type: 'text',                                                                                                  //
//   displayName: 'Date de naissance',                                                                              //
//   required: false                                                                                                //
// },                                                                                                               //
{                                                                                                                   // 75
  _id: 'phone',                                                                                                     // 76
  type: 'tel',                                                                                                      // 77
  displayName: 'Téléphone',                                                                                         // 78
  placeholder: 'Téléphone',                                                                                         // 79
  required: true,                                                                                                   // 80
  minLength: 6,                                                                                                     // 81
  // re: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,                                                           //
  re: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,                                                // 83
  errStr: 'Téléphone non-valide'                                                                                    // 84
}]);                                                                                                                //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collections.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/collections.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
VehicleTypes = new Mongo.Collection('vehicletypes');                                                                // 1
Reservations = new Mongo.Collection('reservations');                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"helpers.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/helpers.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
if (typeof Helpers === 'undefined' || Helpers === null) {                                                           // 1
  Helpers = {};                                                                                                     // 2
}                                                                                                                   //
                                                                                                                    //
Helpers.isAdmin = function () {                                                                                     // 5
  return Roles.userIsInRole(this.userId, [CONST.USER_ROLES.ADMIN]);                                                 // 6
};                                                                                                                  //
                                                                                                                    //
Helpers.isDriver = function () {                                                                                    // 9
  // return Roles.userIsInRole(Meteor.user(), [CONST.USER_ROLES.DRIVER])                                            //
  return Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]);                                                // 11
};   
                                                                                                                //
Helpers.getFullName = function (firstName, lastName) {                                                              // 14
  return firstName + ' ' + lastName;                                                                                // 15
};                                                                                                                  //
                                                                                                                    //
if (Meteor.isServer) {                                                                                              // 18
  // Server side helpers                                                                                            //
  if (typeof Helpers === 'undefined' || Helpers === null) {                                                         // 20
    Helpers = {};                                                                                                   // 21
  }                                                                                                                 //
                                                                                                                    //
  Helpers.sendEmail = function (to, from, subject, text) {                                                          // 24
    check([to, from, subject, text], [String]);                                                                     // 25
                                                                                                                    //
    // Let other method calls from the same client start running,                                                   //
    // without waiting for the email sending to complete.                                                           //
    // this.unblock()                                                                                               //
                                                                                                                    //
    // console.log('sendEmail: '.concat(to, ', ', from, ', ', subject, ', ', text))                                 //
                                                                                                                    //
    Email.send({                                                                                                    // 24
      to: to,                                                                                                       // 34
      from: from,                                                                                                   // 35
      subject: subject,                                                                                             // 36
      text: text                                                                                                    // 37
    });                                                                                                             //
  };                                                                                                                //
                                                                                                                    //
  Helpers.notifyNewReservation = function (email) {                                                                 // 41
    check(email, String);                                                                                           // 42
                                                                                                                    //
    var subject = 'Nouvelle reservation';                                                                           // 44
    var text = 'Bonjour,\r\n\r\nune nouvelle reservation est disponible.';                                          // 45
                                                                                                                    //
    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);                                                       // 47
  };                                                                                                                //
                                                                                                                    //
  Helpers.notifyReservationAcceptance = function (email) {                                                          // 50
    check(email, String);                                                                                           // 51
                                                                                                                    //
    var subject = 'Reservation confirmée';                                                                          // 53
    var text = 'Bonjour,\r\n\r\nVotre reservation est confirmée.\r\n\r\nDays';                                      // 54
                                                                                                                    //
    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);                                                       // 56
  };                                                                                                                //
                                                                                                                    //
  Helpers.notifyReservationConfirmation = function (email) {                                                        // 59
    check(email, String);                                                                                           // 60
                                                                                                                    //
    var subject = 'Reservation effectuée';                                                                          // 62
    var text = 'Bonjour,\r\n\r\nVotre reservation est effectuée.\r\n\r\nDays';                                      // 63
                                                                                                                    //
    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);                                                       // 65
  };                                                                                                                //
                                                                                                                    //
  Helpers.notifyReservationCancellation = function (email) {                                                        // 68
    check(email, String);                                                                                           // 69
                                                                                                                    //
    var subject = 'Reservation annulée';                                                                            // 71
    var text = 'Bonjour,\r\n\r\nVotre reservation est annulée.\r\n\r\nDays';                                        // 72
                                                                                                                    //
    Helpers.sendEmail(email, CONST.MAIL_FROM, subject, text);                                                       // 74
  };                                                                                                                //
}                                                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/router.js                                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var publicRoutes = FlowRouter.group({                                                                               // 1
  name: 'public'                                                                                                    // 2
});                                                                                                                 //
var securedRoutes = FlowRouter.group({                                                                              // 4
  prefix: '/s',                                                                                                     // 5
  name: 'secured',                                                                                                  // 6
  triggersEnter: [AccountsTemplates.ensureSignedIn]                                                                 // 7
});                                                                                                                 //
                                                                                                                    //
// triggersEnter: [function (context, redirect) {                                                                   //
//     //if(!Roles.userIsInRole(Meteor.user(), ['driver'])) {                                                       //
//     if(!(Meteor.loggingIn() || Meteor.user())) {                                                                 //
//         FlowRouter.go(FlowRouter.path('/notAuthorized'))                                                         //
//     }                                                                                                            //
// }]                                                                                                               //
publicRoutes.route('/', {                                                                                           // 16
  name: 'home',                                                                                                     // 17
  action: function () {                                                                                             // 18
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'home' });                                                            // 19
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/services', {                                                                                   // 23
  name: 'services',                                                                                                 // 24
  action: function () {                                                                                             // 25
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'services' });                                                        // 26
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/drivers', {                                                                                    // 30
  name: 'drivers',                                                                                                  // 31
  action: function () {                                                                                             // 32
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'drivers' });                                                         // 33
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/vehicles', {                                                                                   // 37
  name: 'vehicles',                                                                                                 // 38
  action: function () {                                                                                             // 39
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'vehicles' });                                                        // 40
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/values', {                                                                                     // 44
  name: 'values',                                                                                                   // 45
  action: function () {                                                                                             // 46
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'values' });                                                          // 47
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/reservation', {                                                                                // 51
  name: 'reservation',                                                                                              // 52
  action: function () {                                                                                             // 53
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'reservation' });                                                     // 54
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
publicRoutes.route('/notAuthorized', {                                                                              // 58
  name: 'notAuthorized',                                                                                            // 59
  action: function () {                                                                                             // 60
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'notAuthorized' });                                                   // 61
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
securedRoutes.route('/reservations', {                                                                              // 65
  name: 'reservations',                                                                                             // 66
  action: function () {                                                                                             // 67
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'reservations' });                                                    // 68
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
securedRoutes.route('/profile', {                                                                                   // 72
  name: 'profile',                                                                                                  // 73
  action: function () {                                                                                             // 74
    function action(pathParams, queryParams) {                                                                      //
      BlazeLayout.render('layout', { content: 'profile' });                                                         // 75
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
FlowRouter.notFound = {                                                                                             // 79
  action: function () {                                                                                             // 80
    function action() {                                                                                             // 80
      BlazeLayout.render('layout', { content: 'pageNotFound' });                                                    // 81
    }                                                                                                               //
                                                                                                                    //
    return action;                                                                                                  //
  }()                                                                                                               //
};                                                                                                                  //
                                                                                                                    //
// Routes                                                                                                           //
AccountsTemplates.configureRoute('changePwd');                                                                      // 86
AccountsTemplates.configureRoute('forgotPwd');                                                                      // 87
AccountsTemplates.configureRoute('resetPwd');                                                                       // 88
AccountsTemplates.configureRoute('signIn');                                                                         // 89
AccountsTemplates.configureRoute('signUp');                                                                         // 90
AccountsTemplates.configureRoute('verifyEmail');                                                                    // 91
                                                                                                                    //
// FlowRouter.route('/post/:slug', {                                                                                //
//   action: function() {                                                                                           //
//     BlazeLayout.render('layout', { content: 'post' })                                                            //
//   }                                                                                                              //
// })                                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"schemas.js":function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// lib/schemas.js                                                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Schema = {};                                                                                                        // 1
                                                                                                                    //
Schema.getVehicleTypes = function () {                                                                              // 3
  function getVehicleTypes() {                                                                                      // 3
    return VehicleTypes.find().fetch().map(function (doc) {                                                         // 4
      return doc.name;                                                                                              // 5
    });                                                                                                             //
  }                                                                                                                 //
                                                                                                                    //
  return getVehicleTypes;                                                                                           //
}();                                                                                                                //
                                                                                                                    //
Schema.VehicleType = new SimpleSchema({                                                                             // 9
  name: { label: 'Type de véhicule', type: String },                                                                // 10
  rate: { label: 'Tarif', type: Number, decimal: true }                                                             // 11
});                                                                                                                 //
                                                                                                                    //
// Schema.UserCountry = new SimpleSchema({                                                                          //
//     name: {                                                                                                      //
//         type: String                                                                                             //
//     },                                                                                                           //
//     code: {                                                                                                      //
//         type: String,                                                                                            //
//         regEx: /^[A-Z]{2}$/                                                                                      //
//     }                                                                                                            //
// })                                                                                                               //
                                                                                                                    //
Schema.Vehicle = new SimpleSchema({                                                                                 // 24
  license: { type: String },                                                                                        // 25
  vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },                // 26
  color: { type: String },                                                                                          // 27
  'photos.$': { type: String }                                                                                      // 28
});                                                                                                                 //
                                                                                                                    //
Schema.CreditCard = new SimpleSchema({                                                                              // 31
  num: { type: String },                                                                                            // 32
  validThruM: { type: Number, min: 1, max: 12 },                                                                    // 33
  validThruY: { type: Number },                                                                                     // 34
  cvv: { type: String },                                                                                            // 35
  name: { type: String }                                                                                            // 36
});                                                                                                                 //
                                                                                                                    //
Schema.Profile = new SimpleSchema({                                                                                 // 39
  // gender: {                                                                                                      //
  //     type: String,                                                                                              //
  //     allowedValues: ['M', 'Mme', 'Mlle']                                                                        //
  //     //,optional: true                                                                                          //
  // },                                                                                                             //
  firstName: {                                                                                                      // 45
    type: String                                                                                                    // 46
    // ,optional: true                                                                                              //
  },                                                                                                                // 45
  lastName: {                                                                                                       // 49
    type: String                                                                                                    // 50
    // ,optional: true                                                                                              //
  },                                                                                                                // 49
  birthday: {                                                                                                       // 53
    type: Date, optional: true                                                                                      // 54
  },                                                                                                                //
  phone: {                                                                                                          // 56
    type: String                                                                                                    // 57
    // ,optional: true                                                                                              //
  },                                                                                                                // 56
  vehicle: {                                                                                                        // 60
    type: Schema.Vehicle, optional: true                                                                            // 61
  },                                                                                                                //
  creditCard: {                                                                                                     // 63
    type: Schema.CreditCard, optional: true                                                                         // 64
  }                                                                                                                 //
  // website: {                                                                                                     //
  //     type: String,                                                                                              //
  //     regEx: SimpleSchema.RegEx.Url,                                                                             //
  //     optional: true                                                                                             //
  // },                                                                                                             //
  // country: {                                                                                                     //
  //     type: Schema.UserCountry,                                                                                  //
  //     optional: true                                                                                             //
  // }                                                                                                              //
});                                                                                                                 // 39
                                                                                                                    //
Schema.User = new SimpleSchema({                                                                                    // 77
  // username: {                                                                                                    //
  //     type: String,                                                                                              //
  //     // For accounts-password, either emails or username is required, but not both. It is OK to make this       //
  //     // optional here because the accounts-password package does its own validation.                            //
  //     // Third-party login packages may not require either. Adjust this schema as necessary for your usage.      //
  //     optional: true                                                                                             //
  // },                                                                                                             //
  emails: {                                                                                                         // 85
    type: Array,                                                                                                    // 86
    // For accounts-password, either emails or username is required, but not both. It is OK to make this            //
    // optional here because the accounts-password package does its own validation.                                 //
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.           //
    optional: true                                                                                                  // 90
  },                                                                                                                //
  'emails.$': {                                                                                                     // 92
    type: Object                                                                                                    // 93
  },                                                                                                                //
  'emails.$.address': {                                                                                             // 95
    type: String,                                                                                                   // 96
    regEx: SimpleSchema.RegEx.Email                                                                                 // 97
  },                                                                                                                //
  'emails.$.verified': {                                                                                            // 99
    type: Boolean                                                                                                   // 100
  },                                                                                                                //
  // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
  // registered_emails: {                                                                                           //
  //     type: [Object],                                                                                            //
  //     optional: true,                                                                                            //
  //     blackbox: true                                                                                             //
  // },                                                                                                             //
  createdAt: {                                                                                                      // 108
    type: Date                                                                                                      // 109
  },                                                                                                                //
  profile: {                                                                                                        // 111
    type: Schema.Profile,                                                                                           // 112
    optional: true                                                                                                  // 113
  },                                                                                                                //
  // Make sure this services field is in your schema if you're using any of the accounts packages                   //
  services: {                                                                                                       // 116
    type: Object,                                                                                                   // 117
    optional: true,                                                                                                 // 118
    blackbox: true                                                                                                  // 119
  },                                                                                                                //
  // Add `roles` to your schema if you use the meteor-roles package.                                                //
  // Option 1: Object type                                                                                          //
  // If you specify that type as Object, you must also specify the                                                  //
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.                                                  //
  // Example:                                                                                                       //
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP)                                                   //
  // You can't mix and match adding with and without a group since                                                  //
  // you will fail validation in some cases.                                                                        //
  // roles: {                                                                                                       //
  //     type: Object,                                                                                              //
  //     optional: true,                                                                                            //
  //     blackbox: true                                                                                             //
  // },                                                                                                             //
  // Option 2: [String] type                                                                                        //
  // If you are sure you will never need to use role groups, then                                                   //
  // you can specify [String] as the type                                                                           //
  roles: {                                                                                                          // 137
    type: [String],                                                                                                 // 138
    optional: true                                                                                                  // 139
  },                                                                                                                //
  // In order to avoid an 'Exception in setInterval callback' from Meteor                                           //
  heartbeat: {                                                                                                      // 142
    type: Date,                                                                                                     // 143
    optional: true                                                                                                  // 144
  }                                                                                                                 //
});                                                                                                                 //
                                                                                                                    //
Schema.Reservation = new SimpleSchema({                                                                             // 148
  lastname: { label: 'Nom', type: String },                                                                         // 149
  firstname: { label: 'Prénom', type: String, optional: true },                                                     // 150
  phone: { label: 'Téléphone', type: String },                                                                      // 151
  email: { label: 'Email', type: String, regEx: SimpleSchema.RegEx.Email },                                         // 152
  start: { label: 'Départ', type: String },                                                                         // 153
  end: { label: 'Destination', type: String },                                                                      // 154
  startAt: { label: 'Le', type: Date },                                                                             // 155
  // vehicleType: {label: "Type de véhicule", type: Number, defaultValue: 0},                                       //
  vehicleType: { label: 'Type de véhicule', type: String, allowedValues: Schema.getVehicleTypes() },                // 157
  price: { label: 'Prix', type: Number, decimal: true, defaultValue: 0.00, min: 0 },                                // 158
  driverId: { label: 'Chauffeur', type: String, regEx: SimpleSchema.RegEx.Id, optional: true },                     // 159
  status: { label: 'Statut', type: Number, defaultValue: CONST.RESERVATION_STATUSES.CREATED },                      // 160
  ownerId: { label: 'Id Client', type: String, denyUpdate: true,                                                    // 161
    autoValue: function () {                                                                                        // 162
      function autoValue() {                                                                                        // 162
        if (this.isInsert) {                                                                                        // 163
          return Meteor.userId() || 0;                                                                              // 164
        } else if (this.isUpsert) {                                                                                 //
          return { $setOnInsert: Meteor.userId() || 0 };                                                            // 166
        } else {                                                                                                    //
          this.unset();                                                                                             // 168
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return autoValue;                                                                                             //
    }() },                                                                                                          //
  ownerName: { label: 'Client', type: String, denyUpdate: true,                                                     // 171
    autoValue: function () {                                                                                        // 172
      function autoValue() {                                                                                        // 172
        // console.log('{SimpleSchema ownerName} username = '+Meteor.user().username)                               //
        // console.log('{SimpleSchema ownerName} lastname = '+ this.field('lastname').value)                        //
        if (this.isInsert) {                                                                                        // 175
          return Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value;   // 176
        } else if (this.isUpsert) {                                                                                 //
          return { $setOnInsert: Meteor.user() && Meteor.user().username ? Meteor.user().username : this.field('lastname').value };
        } else {                                                                                                    //
          this.unset();                                                                                             // 180
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return autoValue;                                                                                             //
    }() },                                                                                                          //
  createdAt: { label: 'Réservé le', type: Date, denyUpdate: true,                                                   // 183
    autoValue: function () {                                                                                        // 184
      function autoValue() {                                                                                        // 184
        if (this.isInsert) {                                                                                        // 185
          return new Date();                                                                                        // 186
        } else if (this.isUpsert) {                                                                                 //
          return { $setOnInsert: new Date() };                                                                      // 188
        } else {                                                                                                    //
          this.unset();                                                                                             // 190
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return autoValue;                                                                                             //
    }() }                                                                                                           //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"reservations.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections/reservations.js                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Reservations.attachSchema(Schema.Reservation);                                                                      // 1
                                                                                                                    //
if (Meteor.isClient) {                                                                                              // 3
  // Update allowed values on client when VehicleTypes gets loaded                                                  //
  Tracker.autorun(function () {                                                                                     // 5
    Reservations._c2._simpleSchema._schema.vehicleType.allowedValues = Schema.getVehicleTypes();                    // 6
  });                                                                                                               //
}                                                                                                                   //
                                                                                                                    //
// if(Meteor.isServer) {                                                                                            //
//     // Send emails to drivers                                                                                    //
//     Reservations.after.insert(function (userId, doc) {                                                           //
//         _.each(Meteor.users.find({}, { fields: { 'emails': 1 } }).fetch(), function (user) { Helpers.notifyNewReservation(user.emails[0].address); })
//     })                                                                                                           //
// }                                                                                                                //
                                                                                                                    //
Meteor.methods({                                                                                                    // 17
  createReservation: function () {                                                                                  // 18
    function createReservation(reservation) {                                                                       // 18
      if (!Meteor.user() || !Meteor.user().profile) throw new Meteor.Error('no-profile', "Vous devez completer votre profile avant d'effectuer cette action");
      if (!Meteor.user().profile.creditCard) throw new Meteor.Error('no-card-info', "Vous devez ajouter l'information sur votre carte de paiement dans votre profile avant d'effectuer cette action");
      throw new Meteor.Error('no-card-info', "Vous devez ajouter l'information sur votre carte de paiement dans votre profile avant d'effectuer cette action");
                                                                                                                    //
      reservation.ownerId = Meteor.userId();                                                                        // 23
      reservation.ownerName = Helpers.getFullName(Meteor.user().profile.firstName, Meteor.user().profile.lastName);
      reservation.createdAt = new Date();                                                                           // 25
                                                                                                                    //
      var id = Reservations.insert(reservation, { validationContext: 'createReservation' });                        // 27
                                                                                                                    //
      if (Meteor.isServer) {                                                                                        // 29
        this.unblock();                                                                                             // 30
        // Send notification                                                                                        //
        try {                                                                                                       // 29
          _.each(Meteor.users.find({}, { fields: { 'emails': 1 } }).fetch(), function (user) {                      // 33
            Helpers.notifyNewReservation(user.emails[0].address);                                                   // 33
          });                                                                                                       //
        } catch (error) {                                                                                           //
          // throw error                                                                                            //
          console.log(error);                                                                                       // 36
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return id;                                                                                                    // 40
    }                                                                                                               //
                                                                                                                    //
    return createReservation;                                                                                       //
  }(),                                                                                                              //
  acceptReservation: function () {                                                                                  // 42
    function acceptReservation(reservationId, userId) {                                                             // 42
      // Logged user                                                                                                //
      if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
                                                                                                                    //
      // Driver or Admin only                                                                                       //
      // Get reservation                                                                                            //
      var r = Reservations.findOne(reservationId);                                                                  // 42
      if (!r) throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");                                // 49
      // Only created may be accepted                                                                               //
      if (r.status > CONST.RESERVATION_STATUSES.CREATED) throw new Meteor.Error('not-applicable', "N'est pas applicable");
                                                                                                                    //
      var id = Reservations.update(reservationId, {                                                                 // 53
        $set: {                                                                                                     // 54
          status: CONST.RESERVATION_STATUSES.ACCEPTED,                                                              // 55
          driverId: userId // Preparing "assign to driver"                                                          // 56
        }                                                                                                           // 54
      }, {                                                                                                          //
        validationContext: 'acceptReservation'                                                                      // 59
      });                                                                                                           //
                                                                                                                    //
      if (Meteor.isServer) {                                                                                        // 62
        this.unblock();                                                                                             // 63
        // Send notification                                                                                        //
        try {                                                                                                       // 62
          Helpers.notifyReservationAcceptance(r.email);                                                             // 66
        } catch (error) {                                                                                           //
          // throw error                                                                                            //
          console.log(error);                                                                                       // 69
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return id;                                                                                                    // 73
    }                                                                                                               //
                                                                                                                    //
    return acceptReservation;                                                                                       //
  }(),                                                                                                              //
  confirmReservation: function () {                                                                                 // 75
    function confirmReservation(reservationId, userId) {                                                            // 75
      // Logged user                                                                                                //
      if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
      // Driver or Admin only                                                                                       //
      // Get reservation                                                                                            //
      var r = Reservations.findOne(reservationId);                                                                  // 75
      if (!r) throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");                                // 81
      // Only accepted may be confirmed                                                                             //
      if (r.status > CONST.RESERVATION_STATUSES.ACCEPTED) throw new Meteor.Error('not-applicable', "N'est pas applicable");
                                                                                                                    //
      var id = Reservations.update(reservationId, {                                                                 // 85
        $set: {                                                                                                     // 86
          status: CONST.RESERVATION_STATUSES.CONFIRMED                                                              // 87
        }                                                                                                           //
      }, {                                                                                                          //
        validationContext: 'confirmReservation'                                                                     // 90
      });                                                                                                           //
                                                                                                                    //
      if (Meteor.isServer) {                                                                                        // 93
        this.unblock();                                                                                             // 94
        // Send notification                                                                                        //
        try {                                                                                                       // 93
          Helpers.notifyReservationConfirmation(r.email);                                                           // 97
        } catch (error) {                                                                                           //
          // throw error                                                                                            //
          console.log(error);                                                                                       // 100
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return id;                                                                                                    // 104
    }                                                                                                               //
                                                                                                                    //
    return confirmReservation;                                                                                      //
  }(),                                                                                                              //
  cancelReservation: function () {                                                                                  // 106
    function cancelReservation(reservationId, userId) {                                                             // 106
      // Logged user                                                                                                //
      if (userId !== Meteor.userId()) throw new Meteor.Error('not-authorized', "Vous n'etes pas authorizes d'effectuer cette action");
      // Driver or Admin only                                                                                       //
      // Get reservation                                                                                            //
      var r = Reservations.findOne(reservationId);                                                                  // 106
      if (!r) throw new Meteor.Error('not-found', "Le document n'a pas été trouvé");                                // 112
                                                                                                                    //
      var id = Reservations.update(reservationId, {                                                                 // 114
        $set: {                                                                                                     // 115
          status: CONST.RESERVATION_STATUSES.CANCELLED                                                              // 116
        }                                                                                                           //
      }, {                                                                                                          //
        validationContext: 'cancelReservation'                                                                      // 119
      });                                                                                                           //
                                                                                                                    //
      if (Meteor.isServer) {                                                                                        // 122
        this.unblock();                                                                                             // 123
        // Send notification                                                                                        //
        try {                                                                                                       // 122
          Helpers.notifyReservationCancellation(r.email);                                                           // 126
        } catch (error) {                                                                                           //
          // throw error                                                                                            //
          console.log(error);                                                                                       // 129
        }                                                                                                           //
      }                                                                                                             //
                                                                                                                    //
      return id;                                                                                                    // 133
    }                                                                                                               //
                                                                                                                    //
    return cancelReservation;                                                                                       //
  }()                                                                                                               //
});                                                                                                                 //
                                                                                                                    //
// // Define a namespace for Methods related to the Reservations collection                                         //
// // Allows overriding for tests by replacing the implementation (2)                                               //
// Reservations.methods = {}                                                                                        //
                                                                                                                    //
// Reservations.methods.insert = new ValidatedMethod({                                                              //
//   name: 'Reservations.methods.insert',                                                                           //
//   // Factor out validation so that it can be run independently (1)                                               //
//   validate: Reservations.schema.validator(),                                                                     //
//   // Factor out Method body so that it can be called independently (3)                                           //
//   run(newReservation) {                                                                                          //
//       newReservation.price = -11                                                                                 //
//     var id = Reservations.insert(newReservation, {validationContext: 'Reservations.methods.insert'})             //
//     return id                                                                                                    //
//   }                                                                                                              //
// })                                                                                                               //
                                                                                                                    //
// Reservations.methods.confirm = new ValidatedMethod({                                                             //
//   name: 'Reservations.methods.confirm',                                                                          //
//   // Factor out validation so that it can be run independently (1)                                               //
//   validate: Reservations.schema.validator(),                                                                     //
//   // Factor out Method body so that it can be called independently (3)                                           //
//   run(newReservation) {                                                                                          //
//       newReservation.price = -11                                                                                 //
//     var id = Reservations.insert(newReservation, {validationContext: 'Reservations.methods.insert'})             //
//     return id                                                                                                    //
//   }                                                                                                              //
// })                                                                                                               //
                                                                                                                    //
// // This Method encodes the form validation requirements.                                                         //
// // By defining them in the Method, we do client and server-side                                                  //
// // validation in one place.                                                                                      //
// Reservations.methods.insert = new ValidatedMethod({                                                              //
//   name: 'Invoices.methods.insert',                                                                               //
//   validate: new SimpleSchema({                                                                                   //
//     email: { type: String, regEx: SimpleSchema.RegEx.Email },                                                    //
//     description: { type: String, min: 5 },                                                                       //
//     amount: { type: String, regEx: /^\d*\.(\d\d)?$/ }                                                            //
//   }).validator(),                                                                                                //
//   run(newInvoice) {                                                                                              //
//     // In here, we can be sure that the newInvoice argument is                                                   //
//     // validated.                                                                                                //
//                                                                                                                  //
//     if (!this.userId) {                                                                                          //
//       throw new Meteor.Error('Invoices.methods.insert.not-logged-in',                                            //
//         'Must be logged in to create an invoice.')                                                               //
//     }                                                                                                            //
//                                                                                                                  //
//     Reservations.insert(newInvoice)                                                                              //
//   }                                                                                                              //
// })                                                                                                               //
//                                                                                                                  //
// Todos.methods.updateText = new ValidatedMethod({                                                                 //
//   name: 'Todos.methods.updateText',                                                                              //
//   validate: new SimpleSchema({                                                                                   //
//     todoId: { type: String },                                                                                    //
//     newText: { type: String }                                                                                    //
//   }).validator(),                                                                                                //
//   run({ todoId, newText }) {                                                                                     //
//     const todo = Todos.findOne(todoId)                                                                           //
//                                                                                                                  //
//     if (!todo.editableBy(this.userId)) {                                                                         //
//       throw new Meteor.Error('Todos.methods.updateText.unauthorized',                                            //
//         'Cannot edit todos in a private list that is not yours')                                                 //
//     }                                                                                                            //
//                                                                                                                  //
//     Todos.update(todoId, {                                                                                       //
//       $set: { text: newText }                                                                                    //
//     })                                                                                                           //
//   }                                                                                                              //
// })                                                                                                               //
                                                                                                                    //
// Meteor.methods({                                                                                                 //
//   createReservation: function(reservation) {                                                                     //
//     // check(Meteor.userId(), String)                                                                            //
//     // check(activity, {                                                                                         //
//     //   recipeName: String,                                                                                     //
//     //   text: String,                                                                                           //
//     //   image: String                                                                                           //
//     // })                                                                                                        //
//     // check(tweet, Boolean)                                                                                     //
//     // check(loc, Match.OneOf(Object, null))                                                                     //
//                                                                                                                  //
//     reservation.ownerId = Meteor.userId()                                                                        //
//     reservation.ownerName = Meteor.user().profile.name                                                           //
//     reservation.createdAt = new Date                                                                             //
//                                                                                                                  //
//     var id = Reservations.insert(reservation)                                                                    //
//                                                                                                                  //
//     return id                                                                                                    //
//   }                                                                                                              //
// })                                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"users.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections/users.js                                                                                             //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.users.attachSchema(Schema.User);                                                                             // 1
                                                                                                                    //
Meteor.methods({                                                                                                    // 3
  updateUserProfile: function () {                                                                                  // 4
    function updateUserProfile(newProfile) {                                                                        // 4
      var userId = Meteor.userId();                                                                                 // 5
      // var isEmailChanged = currentProfile ?                                                                      //
      //     newProfile.email != currentProfile.email :                                                             //
                                                                                                                    //
      Meteor.users.update(userId, {                                                                                 // 4
        $set: {                                                                                                     // 10
          profile: newProfile                                                                                       // 11
        }                                                                                                           //
      }, {                                                                                                          //
        validationContext: 'updateUserProfile'                                                                      // 14
      });                                                                                                           //
                                                                                                                    //
      // if (Meteor.isServer) {                                                                                     //
      //   this.unblock()                                                                                           //
      //   if (isEmailChanged) {                                                                                    //
      //     // Send notification                                                                                   //
      //     try {                                                                                                  //
      //       Accounts.sendVerificationEmail()                                                                     //
      //     } catch (error) {                                                                                      //
      //       //throw error                                                                                        //
      //       console.log(error)                                                                                   //
      //     }                                                                                                      //
      //   }                                                                                                        //
      // }                                                                                                          //
                                                                                                                    //
      // return id                                                                                                  //
    }                                                                                                               // 4
                                                                                                                    //
    return updateUserProfile;                                                                                       //
  }()                                                                                                               //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vehicletypes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// collections/vehicletypes.js                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
VehicleTypes.attachSchema(Schema.VehicleType);                                                                      // 1
                                                                                                                    //
// PrePopulate data                                                                                                 //
// if (Meteor.isServer && VehicleTypes.find().count() === 0) {                                                      //
if (Meteor.isServer && !VehicleTypes.findOne()) {                                                                   // 5
  Meteor.startup(function () {                                                                                      // 6
    VehicleTypes.insert({ name: 'Audi A6', rate: 2.00 });                                                           // 7
    VehicleTypes.insert({ name: 'Audi A8', rate: 2.20 });                                                           // 8
    VehicleTypes.insert({ name: 'Mercedes Classe E', rate: 2.20 });                                                 // 9
    VehicleTypes.insert({ name: 'Mercedes Classe S', rate: 2.50 });                                                 // 10
    VehicleTypes.insert({ name: 'Caravelle Minibus', rate: 2.50 });                                                 // 11
    VehicleTypes.insert({ name: 'Mercedes Classe V Minibus', rate: 2.50 });                                         // 12
  });                                                                                                               //
}                                                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"_startup.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/_startup.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.startup(function () {                                                                                        // 1
  // code to run on server at startup                                                                               //
  smtp = {                                                                                                          // 3
    username: 'foalicensee@outlook.com', // eg: server@gentlenode.com                                               // 4
    password: 'F0@1icensee', // eg: 3eeP1gtizk5eziohfervU                                                           // 5
    server: 'smtp-mail.outlook.com', // eg: smtp.live.com                                                           // 6
    port: 587 // 25                                                                                                 // 7
  };                                                                                                                // 3
                                                                                                                    //
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  // console.log(process.env.MAIL_URL)                                                                              //
                                                                                                                    //
  Accounts.emailTemplates.siteName = 'Days';                                                                        // 1
  Accounts.emailTemplates.from = 'Days <foalicensee@outlook.com>';                                                  // 14
  Accounts.emailTemplates.resetPassword.subject = function (user) {                                                 // 15
    return 'Bienvenue ' + user.profile.displayName;                                                                 // 16
  };                                                                                                                //
                                                                                                                    //
  Accounts.emailTemplates.resetPassword.text = function (user, url) {                                               // 19
    var signature = 'Days';                                                                                         // 20
    // var president = President.findOne()                                                                          //
    // if (president)                                                                                               //
    //    president = Meteor.users.findOne(president.presidentId)                                                   //
    //    signature = president.profile.displayName + ", the MySite President."                                     //
                                                                                                                    //
    return 'Cher ' + user.profile.displayName + ',\n\n' + 'Cliquez sur le lien suivant pour mettre un nouveau mot de passe :\n' + url + '\n\n' + "Ne l'oubliez pas!!!\n\n\n" + 'Cordialement,\n' + signature;
  };                                                                                                                //
                                                                                                                    //
  // try {                                                                                                          //
  //     Email.send({                                                                                               //
  //         from: "foalicensee@outlook.com",                                                                       //
  //         to: "wkurtsev@gmail.com",                                                                              //
  //         subject: "METEOR TEST",                                                                                //
  //         text: "Meteor test email"                                                                              //
  //     })                                                                                                         //
  // } catch (error) {                                                                                              //
  //     console.log(error)                                                                                         //
  // }                                                                                                              //
  // Helpers.notifyNewReservation('wkurtsev@gmail.com')                                                             //
});                                                                                                                 // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"accounts.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/accounts.js                                                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// Set up login services                                                                                            //
Meteor.startup(function () {                                                                                        // 2
  // Add Facebook configuration entry                                                                               //
  /*                                                                                                                //
  ServiceConfiguration.configurations.update(                                                                       //
    { service: "facebook" },                                                                                        //
    { $set: {                                                                                                       //
        appId: "XXXXXXXXXXXXXXX",                                                                                   //
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"                                                                  //
      }                                                                                                             //
    },                                                                                                              //
    { upsert: true }                                                                                                //
  )                                                                                                                 //
  */                                                                                                                //
                                                                                                                    //
  // Add GitHub configuration entry                                                                                 //
  /*                                                                                                                //
  ServiceConfiguration.configurations.update(                                                                       //
    { service: "github" },                                                                                          //
    { $set: {                                                                                                       //
        clientId: "XXXXXXXXXXXXXXXXXXXX",                                                                           //
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"                                                          //
      }                                                                                                             //
    },                                                                                                              //
    { upsert: true }                                                                                                //
  )                                                                                                                 //
  */                                                                                                                //
                                                                                                                    //
  // Add Google configuration entry                                                                                 //
  /*                                                                                                                //
  ServiceConfiguration.configurations.update(                                                                       //
    { service: "google" },                                                                                          //
    { $set: {                                                                                                       //
        clientId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",                       //
        client_email: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",                //
        secret: "XXXXXXXXXXXXXXXXXXXXXXXX"                                                                          //
      }                                                                                                             //
    },                                                                                                              //
    { upsert: true }                                                                                                //
  )                                                                                                                 //
  */                                                                                                                //
                                                                                                                    //
  // Add Linkedin configuration entry                                                                               //
  /*                                                                                                                //
  ServiceConfiguration.configurations.update(                                                                       //
    { service: "linkedin" },                                                                                        //
    { $set: {                                                                                                       //
        clientId: "XXXXXXXXXXXXXX",                                                                                 //
        secret: "XXXXXXXXXXXXXXXX"                                                                                  //
      }                                                                                                             //
    },                                                                                                              //
    { upsert: true }                                                                                                //
  )                                                                                                                 //
  */                                                                                                                //
});                                                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"browserpolicy.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/browserpolicy.js                                                                                          //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
BrowserPolicy.content.allowEval();                                                                                  // 1
BrowserPolicy.content.allowOriginForAll('*.google.com');                                                            // 2
BrowserPolicy.content.allowOriginForAll('*.googleapis.com');                                                        // 3
BrowserPolicy.content.allowOriginForAll('*.gstatic.com');                                                           // 4
BrowserPolicy.content.allowFontDataUrl();                                                                           // 5
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server/publications.js                                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.publish('vehicletypes', function () {                                                                        // 1
  return VehicleTypes.find();                                                                                       // 2
});                                                                                                                 //
                                                                                                                    //
Meteor.publish('reservations', function () {                                                                        // 5
  // console.log('publish reservations() this.userId='+this.userId)                                                 //
  // console.log('publish reservations() Roles.userIsInRole(this.userId, [driver])='+Roles.userIsInRole(this.userId, [CONST.USER_ROLES.DRIVER]))
  if (Helpers.isDriver()) {                                                                                         // 8
    return Reservations.find({}, { sort: { createdAt: -1 } });                                                      // 9
  } else {                                                                                                          //
    return Reservations.find({ ownerId: this.userId }, { sort: { createdAt: -1 } });                                // 12
  }                                                                                                                 //
});                                                                                                                 //
                                                                                                                    //
// search example                                                                                                   //
// Meteor.publish("allItems", function (searchQuery) {                                                              //
//   var mongoQuery = {}                                                                                            //
//   if(searchQuery){                                                                                               //
//     _.each(_.keys(searchQuery), function(key){                                                                   //
//       if(_.isNumber(searchQuery[key])){                                                                          //
//         mongoQuery[key] = searchQuery[key]                                                                       //
//       }else{                                                                                                     //
//         mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'}                                              //
//       }                                                                                                          //
//     })                                                                                                           //
//   }                                                                                                              //
//   return Items.find(mongoQuery,{limit:10})                                                                       //
// })                                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./lib/_contants.js");
require("./lib/_startup.js");
require("./lib/accounts.js");
require("./lib/collections.js");
require("./lib/helpers.js");
require("./lib/router.js");
require("./lib/schemas.js");
require("./collections/reservations.js");
require("./collections/users.js");
require("./collections/vehicletypes.js");
require("./server/_startup.js");
require("./server/accounts.js");
require("./server/browserpolicy.js");
require("./server/publications.js");
//# sourceMappingURL=app.js.map
