Template.subscribe.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var subscription = {
      email: $(e.target).find('[name=email]').val()      
    }

    Meteor.call('subscribe', subscription, function (error, id) {
       if (error) {
          if(error.error === 302) {
            var id = error.details;
            Router.go('unsubscribe', {_id: id});
            return;
          }        
        alert(error.reason);
      } else {
        Meteor.call('sendEmail', Subscriptions.findOne(id),'Daily Compliment Registration', 'You have been registered for the Daily Compliment.');
        Router.go('finished');
      }
    });     
  }
});