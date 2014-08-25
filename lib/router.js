Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return [Meteor.subscribe('subscriptions'), Meteor.subscribe('compliments')]; }
});

Router.map(function() {
  this.route('subscribe', { path: '/' });
  this.route('finished', { path:'/finished/' });
  this.route('unsubscribe', {
    path:'/unsubscribe/:_id',
    data: function() { return Subscriptions.findOne(this.params._id) }
  });
});