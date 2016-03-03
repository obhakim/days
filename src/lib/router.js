var publicRoutes = FlowRouter.group({
    name: 'public'
});
var securedRoutes = FlowRouter.group({
    prefix: '/s',
    name: 'secured',
    triggersEnter: [function (context, redirect) {
        //if(!Roles.userIsInRole(Meteor.user(), ['driver'])) {
        if(!(Meteor.loggingIn() || Meteor.user())) {            
            FlowRouter.go(FlowRouter.path('notAuthorized'))
        }
    }]
});

publicRoutes.route('/', {
    name: "home",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'home' });
    }
});

publicRoutes.route('/services', {
    name: "services",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'services' });
    }
});

publicRoutes.route('/drivers', {
    name: "drivers",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'drivers' });
    }
});

publicRoutes.route('/vehicles', {
    name: "vehicles",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'vehicles' });
    }
});

publicRoutes.route('/values', {
    name: "values",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'values' });
    }
});

securedRoutes.route('/reservation', {
    name: "reservation",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'reservation' });
    }
});

securedRoutes.route('/reservations', {
    name: "reservations",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'reservations' });
    }
});

securedRoutes.route('/test', {
    name: "test",
    action(pathParams, queryParams) {
        BlazeLayout.render('layout', { content: 'test' });
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('layout', { content: 'pageNotFound' });
    }
};

// FlowRouter.route('/post/:slug', {
//   action: function() {
//     BlazeLayout.render('layout', { content: 'post' });
//   }
// });