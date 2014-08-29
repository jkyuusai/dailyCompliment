Template.unsubscribe.helpers({
  unsubscribe: function () {      
    Meteor.call('unsubscribe', this.id, function(error, id) {
      
      if(error) {
        Toast.error(error.details);
      }

      Toast.success("You've been unsubscribed from the Daily Compliment!");
      Router.go('subscribe');
    });    
  }
});
  		