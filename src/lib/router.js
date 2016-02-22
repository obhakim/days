FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { content: 'home' });
  }
});

FlowRouter.route('/services', {
  action: function() {
    BlazeLayout.render('layout', { content: 'services' });
  }
});

FlowRouter.route('/drivers', {
  action: function() {
    BlazeLayout.render('layout', { content: 'drivers' });
  }
});

FlowRouter.route('/vehicles', {
  action: function() {
    BlazeLayout.render('layout', { content: 'vehicles' });
  }
});

FlowRouter.route('/values', {
  action: function() {
    BlazeLayout.render('layout', { content: 'values' });
  }
});

FlowRouter.route('/reservations', {
  action: function() {
    BlazeLayout.render('layout', { content: 'reservations' });
  }
});

FlowRouter.route('/reservation', {
  action: function() {
    BlazeLayout.render('layout', { content: 'reservation' });
  }
});



// FlowRouter.route('/post/:slug', {
//   action: function() {
//     BlazeLayout.render('layout', { content: 'post' });
//   }
// });