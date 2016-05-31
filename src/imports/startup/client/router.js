import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Helpers } from '../../common/helpers.js';

// Import to load these templates
import '../../ui/layouts/layout.js';
import '../../ui/pages/driver-join.js';
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


const publicRoutes = FlowRouter.group({
  name: 'public',
});

const securedRoutes = FlowRouter.group({
  prefix: '/s',
  name: 'secured',
  triggersEnter: [AccountsTemplates.ensureSignedIn],

// triggersEnter: [function (context, redirect) {
//     //if(!Roles.userIsInRole(Meteor.user(), ['driver'])) {
//     if(!(Meteor.loggingIn() || Meteor.user())) {
//         FlowRouter.go(FlowRouter.path('/notAuthorized'))
//     }
// }]
});

const driverRoutes = securedRoutes.group({
  prefix: '/driver',
  name: 'driver',
  triggersEnter: [(context, redirect) => {
    console.log('trigger isDriver=' + Helpers.isDriver());
    if (!Helpers.isDriver()) {
      redirect('/notAuthorized');
    }
  },
  ],
});

publicRoutes.route('/', {
  name: 'home',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'home',
    });
  },
});

publicRoutes.route('/services', {
  name: 'services',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'services',
    });
  },
});

publicRoutes.route('/drivers', {
  name: 'drivers',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'drivers',
    });
  },
});

publicRoutes.route('/vehicles', {
  name: 'vehicles',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'vehicles',
    });
  },
});

publicRoutes.route('/values', {
  name: 'values',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'values',
    });
  },
});

publicRoutes.route('/reservation', {
  name: 'reservation',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'reservation',
    });
  },
});

publicRoutes.route('/notAuthorized', {
  name: 'notAuthorized',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'notAuthorized',
    });
  },
});

publicRoutes.route('/driver/join', {
  name: 'driverJoin',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'driverJoin',
    });
  },
});

securedRoutes.route('/reservations', {
  name: 'reservations',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'Reservations',
    });
  },
});

securedRoutes.route('/profile', {
  name: 'profile',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'Profile',
    });
  },
});

driverRoutes.route('/vehicles', {
  name: 'driverVehicles',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', {
      content: 'DriverVehicles',
    });
  },
});

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('layout', {
      content: 'pageNotFound',
    });
  },
};

// Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

// FlowRouter.route('/post/:slug', {
//   action: function () {
//     BlazeLayout.render('layout', { content: 'post' })
//   }
// })
