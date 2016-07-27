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
    // console.log('trigger isDriver=' + Helpers.isDriver());
    if (!Helpers.isDriver()) {
      redirect('/notAuthorized');
    }
  },
  ],
});

publicRoutes.route('/', {
  name: 'home',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Home',
    });
  },
});

publicRoutes.route('/services', {
  name: 'services',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Services',
    });
  },
});

publicRoutes.route('/drivers', {
  name: 'drivers',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Drivers',
    });
  },
});

publicRoutes.route('/vehicles', {
  name: 'vehicles',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Vehicles',
    });
  },
});

publicRoutes.route('/values', {
  name: 'values',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Values',
    });
  },
});

publicRoutes.route('/reservation', {
  name: 'reservation',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Reservation',
    });
  },
});

publicRoutes.route('/notAuthorized', {
  name: 'notAuthorized',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'NotAuthorized',
    });
  },
});

publicRoutes.route('/driver/join', {
  name: 'driverJoin',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverJoin',
    });
  },
});

securedRoutes.route('/reservations', {
  name: 'reservations',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Reservations',
    });
  },
});

securedRoutes.route('/profile', {
  name: 'profile',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'Profile',
    });
  },
});

driverRoutes.route('/company', {
  name: 'driverCompany',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverCompany',
    });
  },
});

driverRoutes.route('/vehicles', {
  name: 'driverVehicles',
  action(pathParams, queryParams) {
    BlazeLayout.render('Layout', {
      content: 'DriverVehicles',
    });
  },
});

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('Layout', {
      content: 'PageNotFound',
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
//     BlazeLayout.render('Layout', { content: 'post' })
//   }
// })
