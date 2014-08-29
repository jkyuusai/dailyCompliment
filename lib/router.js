Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

if(Meteor.isClient) {
	Router.onBeforeAction('dataNotFound');
}

Router.map(function() {
  this.route('subscribe', { path: '/' });  
  this.route('confirmRegistration', { 
  	path: '/confirmRegistration/:_id',  	
  	data: function() { return {id: this.params._id} }
   });  
  this.route('unsubscribe', { 
  	path:'/unsubscribe/:_id',
  	data: function() {return {id: this.params._id} }
   });
});