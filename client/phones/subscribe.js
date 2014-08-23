Template.subscribe.events({
  'submit form': function(e) {
    e.preventDefault();
    Session.set('unsubscribed', false);
    var phone = {
      number: $(e.target).find('[name=phone]').val(),
      carrier:  $(e.target).find('[name=carrier]').val(),
    }

    Meteor.call('phone', phone, function (error, id) {
       if (error) {
          if(error.error === 302) {
            var id = error.details;
            Router.go('unsubscribe', {_id: id});
            return;
          }        
        alert(error.reason);
      } else {
        Meteor.call('sendEmail', Phones.findOne(id));
        Router.go('finished');
      }
    });     
  }
});