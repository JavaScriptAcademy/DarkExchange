Template.appQuotes.onCreated(function quotesOnCreated() {


   Meteor.subscribe('quotes', Meteor.user()._id);

});

Template.appQuotes.onRendered(function() {
    if(Session.get("QUOTE_COUNT") != undefined){
        Session.set("QUOTE_COUNT", undefined);
    }
});

Template.appQuotes.helpers({
	quotes() {
		return quotes.find({});
	}
});

Template.appQuotes.events({
});

Tracker.autorun(function () {

  var count = quotes.find({}).count();
  Session.set("QUOTE_COUNT", count);

});