Template.unsubscribe.helpers({
	unsubscribed: function () {
		return Session.equals('unsubscribed', true);
	}
});

Template.unsubscribe.events({
  'click .submit': function(e) {  			
  		Meteor.call('unsubscribe', Phones.findOne(this._id));
  		Session.set('unsubscribed', true);
  },
  'click .cancel': function(e) {
  		Router.go('subscribe');
  }
});
  		