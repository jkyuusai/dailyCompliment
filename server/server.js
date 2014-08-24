Meteor.startup(function () {
 process.env.MAIL_URL = 'smtp://postmaster%40dailycompliment.meteor.com:f984a20b7071c023842f6f68c8bdca81@smtp.mailgun.org:587';
});

//TODO: Change this to a collection
var carrierList = {
			'AT&T': 'mms.att.net',
			'Verizon': 'vtext.com',
			'TMobile': 'tmomail.net',
			'Sprint': 'messaging.sprintpcs.com'
}

Meteor.methods({
	sendEmail: function(subscription) {
		var number = subscription.number;
		var carrier = subscription.carrier;		
		Email.send({to:number +'@' + carrierList[carrier], from:'jkyuusai@gmail.com', subject:'Daily Compliment Registration', text:'You have been registered for the Daily Compliment.'});
	},
	unsubscribe: function(subscription) {			
		Phones.remove(subscription._id);
	}
});