Meteor.startup(function () {
 process.env.MAIL_URL = 'smtp://postmaster%40dailycompliment.meteor.com:f984a20b7071c023842f6f68c8bdca81@smtp.mailgun.org:587';
});

Meteor.methods({
	sendEmail: function(subscription) {	
		Email.send({to:subscription.email, from:'jkyuusai@gmail.com', subject:'Daily Compliment Registration', text:'You have been registered for the Daily Compliment.'});
	},
	unsubscribe: function(subscription) {			
		Subscriptions.remove(subscription._id);
	}
});