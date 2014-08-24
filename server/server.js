Meteor.startup(function () {
 process.env.MAIL_URL = 'smtp://postmaster%40***REMOVED***:***REMOVED***@smtp.mailgun.org:587';
});

Meteor.methods({
	sendEmail: function(subscription, subject, body) {	
		Email.send({
			to:subscription.email, 
			from:'dailycomplimentChange@***REMOVED***', 
			subject: subject, text: body
		});
	},
	unsubscribe: function(subscription) {			
		Subscriptions.remove(subscription._id);
	}
});