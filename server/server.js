Meteor.startup(function () {		
	process.env.MAIL_URL = 'smtp://' + smtpKey + '@smtp.mailgun.org:587';
	SyncedCron.start();
});

Meteor.publish('subscriptions', function(id) {
	return Subscriptions.find({_id:id});
});

Meteor.methods({
	sendEmail: function(subscription, subject, body) {
		Email.send({
			to:subscription.email, 
			from:'dailycompliment@sparklecow.io', 
			subject: subject, 
			html: body
		});
	},
	
	sendComplimentEmail: function(id) {
		var subscription = Subscriptions.findOne(id);
		Meteor.call('draw', function(error, compliments) {
        	Meteor.call('sendEmail', 
        		subscription, 
        		'Daily Compliment', 
        		'You are ' + compliments[0].word.toLowerCase() + ' and ' + compliments[1].word.toLowerCase() +'.\n\n' + '<a href="' + Router.routes['unsubscribe'].url({_id:subscription._id}) + '">Unsubscribe</a>'
        	);
	    });
	},

	sendRegistrationConfirmationEmail: function(id) {
		var subscription = Subscriptions.findOne(id);
		Meteor.call('sendEmail', subscription,'Please Confirm your Registration to the Daily Compliment', 'Please click the link below to confirm your registration for the Daily Compliment.\n\n' + Router.routes['confirmRegistration'].url({_id:subscription._id}));
	},

	sendAutoUnsubscribedNotificationEmail: function(subscription) {
		Meteor.call('sendEmail', subscription,'Daily Compliment Subscription Notification','You have been automatically unsubscribed from the Daily Compliment');
	},

	unsubscribe: function(id) {
		Subscriptions.remove(id);
	}
});

SyncedCron.add({
	name: 'send daily compliments',
	schedule: function(parser) {
		return parser.recur().on('12:00:00').time();
	},
	job: function() {
		Subscriptions.find({confirmed:true}).forEach(function (subscription) {
			Meteor.call('sendComplimentEmail', subscription);
		});
		 
	}
});

SyncedCron.add({
	name: 'prune old subscriptions',
	schedule: function(parser) {
		return parser.recur().every(1).hour();
	},
	job: function() {
		Subscriptions.find().forEach(function (sub) {
			if(moment().diff(sub.submitted, 'days') >= 7) {
				Meteor.call('unsubscribe', sub);
				Meteor.call('sendAutoUnsubscribedNotificationEmail', sub);
			}
		});
		 
	}
});

