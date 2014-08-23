Template.subscribe.helpers({
  foo: function () {
    // ...
  }
});

Template.subscribe.events({
  'submit form': function(e) {
    e.preventDefault();

      console.log('stuff');
      

    var phone = {
      number: $(e.target).find('[name=phone]').val(),
      carrier:  $(e.target).find('[name=carrier]').val(),
    }

    Meteor.call('phone', phone, function (error, id) {
       if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('testNumber', {_id: id});
      }
    });     
  }
});