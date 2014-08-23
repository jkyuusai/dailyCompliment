Template.testNumber.events({
	'click button.test': function () {
		Meteor.call('sendEmail', this);								
	}
});