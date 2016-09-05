import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Helpers } from '../../common/helpers.js';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/driver-join.js';
import '../../ui/pages/driver-company.js';
import '../../ui/pages/driver-vehicles.js';
import '../../ui/pages/drivers.js';
import '../../ui/pages/home.js';
import '../../ui/pages/not-authorized.js';
import '../../ui/pages/page-not-found.js';
import '../../ui/pages/profile.js';
import '../../ui/pages/reservation.js';
import '../../ui/pages/reservations.js';
import '../../ui/pages/services.js';
import '../../ui/pages/values.js';
import '../../ui/pages/vehicles.js';
import '../../ui/pages/termsOfUse.js';
import '../../ui/components/atNavButtonCustom.js';

import '../../ui/pages/tdev.js';
import '../../ui/pages/faq.js';


const publicRoutes = FlowRouter.group({
  name: 'public',
});

const securedRoutes = FlowRouter.group({
  prefix: '/s',
  name: 'secured',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
});

const driverRoutes = securedRoutes.group({
  prefix: '/driver',
  name: 'driver',
  triggersEnter: [(context, redirect) => {
    if (!Helpers.isDriver()) {
      redirect('/notAuthorized');
    }
  },
  ],
});

publicRoutes.route('/', {
  name: 'home',
  title: 'Bienvenue | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      banner: 'HomeBanner',
      content: 'Home',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/FAQ', {
  name: 'FAQ',
  title: 'FAQ | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      banner: 'FAQBanner',
      content: 'FAQ',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/services', {
  name: 'services',
  title: 'Notre service | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      banner: 'ServicesBanner',
      content: 'Services',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/drivers', {
  name: 'drivers',
  title: 'Nos chauffeurs | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      banner: 'DriversBanner',
      content: 'Drivers',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/vehicles', {
  name: 'vehicles',
  title: 'Nos véhicules | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Vehicles',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/values', {
  name: 'values',
  title: 'Nos valeurs | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      banner: 'ValuesBanner',
      content: 'Values',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/reservation', {
  name: 'reservation',
  title: 'Réservation | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Reservation',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/notAuthorized', {
  name: 'notAuthorized',
  title: 'Non autorisé | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'NotAuthorized',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/tdev/:lang?', {
  name: 'tdev',
  title: 'DEV Test | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'TDev',
    });
    document.title = TAPi18n.__('dev_test', { lang: pathParams.lang });
  },
});



publicRoutes.route('/driver/join', {
  name: 'driverJoin',
  title: 'Devenir chauffeur | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverJoin',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

publicRoutes.route('/TermsOfUse', {
  name: 'termsOfUse',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'TermsOfUse',
    });
  },
});

securedRoutes.route('/reservations', {
  name: 'reservations',
  title: 'Réservations | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Reservations',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

securedRoutes.route('/profile', {
  name: 'profile',
  title: 'Profil | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Profile',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

driverRoutes.route('/company', {
  name: 'driverCompany',
  title: 'Ma société | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverCompany',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

driverRoutes.route('/vehicles', {
  name: 'driverVehicles',
  title: 'Me véhicules | Days',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverVehicles',
    });
    document.title = FlowRouter.current().route.options.title;
  },
});

FlowRouter.notFound = {
  title: 'Page non trouvée | Days',
  action: () => {
    BlazeLayout.render('Layout', {
      content: 'PageNotFound',
    });
    document.title = FlowRouter.current().route.options.title;
  },
};

AccountsTemplates.configure({
  texts: {
    title: {
      changePwd: 'Changer le mot de passe',
      enrollAccount: 'S\'inscrire',
      forgotPwd: 'Mot de passe oublié',
      resetPwd: 'Réinitialiser le mot de passe',
      signIn: 'Se connecter',
      signUp: 'S\'inscrire',
      verifyEmail: 'Vérifier email',
    },
  },
});
// Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

// FlowRouter.route('/post/:slug', {
//   action: function () {
//     BlazeLayout.render('Layout', { content: 'post' })
//   }
// })
