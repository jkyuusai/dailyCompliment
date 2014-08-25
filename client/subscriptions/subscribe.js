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
        var sub = Subscriptions.findOne(id);
        Meteor.call('sendEmail', sub,'Daily Compliment Registration', 'You have been registered for the Daily Compliment. You will receive your first compliment shortly.');
        Meteor.call('draw', function(error, compliments) {       
              Meteor.call('sendEmail', sub,'Daily Compliment', 'You are ' + compliments[0].word.toLowerCase() + ' and ' + compliments[1].word.toLowerCase() +'.');
          });
        Router.go('finished');
      }
    });     
  }
});