Meteor.startup(function () {
	SyncedCron.start();
});

Meteor.methods({
	sendEmail: function(subscription, subject, body) {	
		Email.send({
			to:subscription.email, 
			from:'dailycompliment@***REMOVED***', 
			subject: subject, text: body
		});
	},
	unsubscribe: function(subscription) {			
		Subscriptions.remove(subscription._id);
	}
});

SyncedCron.add({
	name: 'send daily compliments',
	schedule: function(parser) {
		return parser.recur().on('12:00:00').time();
	},
	job: function() {
		Subscriptions.find().forEach(function (sub) {
			Meteor.call('draw', function(error, compliments) {       
	            Meteor.call('sendEmail', sub,'Daily Compliment', 'You are ' + compliments[0].word.toLowerCase() + ' and ' + compliments[1].word.toLowerCase() +'.');
	        });
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
			if(moment(sub.submitted).days() >= 7) {
				Meteor.call('unsubscribe', sub);
			}
		});
		 
	}
});

