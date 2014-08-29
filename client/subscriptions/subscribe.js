Template.subscribe.events({
  'submit': function(e) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var subscription = {
      email: $(e.target).find('[name=email]').val()      
    }

    Meteor.call('subscribe', subscription, function (error, id) {
      if (error) {
        if(error.error === 302) {
          Toast.error('This address already has an active subscription!')
          return;
        }        
        alert(error.reason);
      } else {                
        Meteor.call('sendRegistrationConfirmationEmail', id);       
        Toast.success('Registration confirmation sent! Please check your email.','',{displayDuration:0})
      }
    });
  }
});