Meteor.methods({
	sendEmail: function(subscription) {
		var number = subscription.number;
		var carrier = subscription.carrier;
		var carrierList = {
			'AT&T': 'mms.att.net',
			'Verizon': 'vtext.com',
			'TMobile': 'tmomail.net',
			'Sprint': 'messaging.sprintpcs.com'
		}
		Email.send({to:number +'@' + carrierList[carrier], subject:'Daily Compliment Registration', text:'You have been registered for the Daily Compliment.'});
	}
});