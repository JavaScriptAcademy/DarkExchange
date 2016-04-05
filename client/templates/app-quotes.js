Template.appQuotes.onCreated(function quotesOnCreated() {


   Meteor.subscribe('quotes', Meteor.user()._id);

});

Template.appQuotes.helpers({
	quotes() {
		return quotes.find({});
	}
});

Template.appQuotes.events({
});