Template.confirmRegistration.helpers({
	confirmed: function () {
		if(self.confirmed) {
			return;
		}			

		Subscriptions.update(this.id, {$set:{confirmed: true}});
		Meteor.call('sendComplimentEmail', this.id);
	}
});