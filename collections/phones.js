Phones = new Meteor.Collection('phones');


Meteor.methods({
  phone: function(phoneAttributes) {
   // var user = Meteor.user(),
      var phoneWithSameNumber = Phones.findOne({number: phoneAttributes.number});

    // ensure the user is logged in
    // if (!user)
    //   throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure a number was entered
    if (!phoneAttributes.number)
      throw new Meteor.Error(422, 'Please fill in a number!');

    // check that there are no previous phones with the same number
    if (phoneAttributes.number && phoneWithSameNumber) {
      throw new Meteor.Error(302,'' ,phoneWithSameNumber._id);
    }

    // pick out the whitelisted keys
    var phone = _.extend(_.pick(phoneAttributes, 'number', 'carrier'), {
      //userId: user._id,
      submitted: new Date().getTime()
    });

    var phoneId = Phones.insert(phone);

    return phoneId;
  }
});