Subscriptions = new Meteor.Collection('subscriptions');

Subscriptions.allow({
  update: function(userId, doc) {
    return true;
  }
})

Meteor.methods({
  subscribe: function(subscriptionAttributes) {      
    var subscriptionWithSameEmail = Subscriptions.findOne({email: subscriptionAttributes.email});    
      
    if (!subscriptionAttributes.email)
      throw new Meteor.Error(422, 'Please fill in a email!');
    
    if (subscriptionAttributes.email && subscriptionWithSameEmail) {
      throw new Meteor.Error(302,'' ,subscriptionWithSameEmail._id);
    }
  
    var subscription = _.extend(_.pick(subscriptionAttributes, 'email'), {      
      submitted: new Date().getTime(),
      confirmed: false
    });

    var subscriptionId = Subscriptions.insert(subscription);

    return subscriptionId;
  }
});