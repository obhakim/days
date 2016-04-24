import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import { AccountsTemplates } from 'meteor/useraccounts:core'

var publicRoutes = FlowRouter.group({
  name: 'public'
})
var driverRoutes = FlowRouter.group({
  prefix: '/driver',
  name: 'driver'
})
var securedRoutes = FlowRouter.group({
  prefix: '/s',
  name: 'secured',
  triggersEnter: [AccountsTemplates.ensureSignedIn],
// triggersEnter: [function (context, redirect) {
//     //if(!Roles.userIsInRole(Meteor.user(), ['driver'])) {
//     if(!(Meteor.loggingIn() || Meteor.user())) {            
//         FlowRouter.go(FlowRouter.path('/notAuthorized'))
//     }
// }]
})

publicRoutes.route('/', {
  name: 'home',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'home' })
  }
})

publicRoutes.route('/services', {
  name: 'services',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'services' })
  }
})

publicRoutes.route('/drivers', {
  name: 'drivers',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'drivers' })
  }
})

publicRoutes.route('/vehicles', {
  name: 'vehicles',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'vehicles' })
  }
})

publicRoutes.route('/values', {
  name: 'values',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'values' })
  }
})

publicRoutes.route('/reservation', {
  name: 'reservation',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'reservation' })
  }
})

publicRoutes.route('/notAuthorized', {
  name: 'notAuthorized',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'notAuthorized' })
  }
})

securedRoutes.route('/reservations', {
  name: 'reservations',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'reservations' })
  }
})

securedRoutes.route('/profile', {
  name: 'profile',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'profile' })
  }
})

driverRoutes.route('/join', {
  name: 'driverJoin',
  action(pathParams, queryParams) {
    BlazeLayout.render('layout', { content: 'driverJoin' })
  }
})

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('layout', { content: 'pageNotFound' })
  }
}

// Routes
AccountsTemplates.configureRoute('changePwd')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')
AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('signUp')
AccountsTemplates.configureRoute('verifyEmail')

// FlowRouter.route('/post/:slug', {
//   action: function() {
//     BlazeLayout.render('layout', { content: 'post' })
//   }
// })
