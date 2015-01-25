Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

if(Meteor.isClient) {
	Router.onBeforeAction('dataNotFound');
}

Router.route('/', {name: 'subscribe'});
Router.route('/confirmRegistration/:_id', {
  name: 'confirmRegistration',
  data: function() { 
    return {id: this.params._id};
  }
});
Router.route('/unsubscribe/:_id', {
  name: 'unsubscribe',
  data: function() {
    return {id: this.params._id};
  }
});