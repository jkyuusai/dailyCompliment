Subscriptions = new Meteor.Collection('subscriptions');


Meteor.methods({
  subscribe: function(subscriptionAttributes) {
   // var user = Meteor.user(),
      var subscriptionWithSameEmail = Subscriptions.findOne({email: subscriptionAttributes.email});

    // ensure the user is logged in
    // if (!user)
    //   throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure a email was entered
    if (!subscriptionAttributes.email)
      throw new Meteor.Error(422, 'Please fill in a email!');

    // check that there are no previous subscriptions with the same email
    if (subscriptionAttributes.email && subscriptionWithSameEmail) {
      throw new Meteor.Error(302,'' ,subscriptionWithSameEmail._id);
    }

    // pick out the whitelisted keys
    var subscription = _.extend(_.pick(subscriptionAttributes, 'email'), {
      //userId: user._id,
      submitted: new Date().getTime()
    });

    var subscriptionId = Subscriptions.insert(subscription);

    return subscriptionId;
  }
});