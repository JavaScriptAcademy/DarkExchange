Template.appStocks.onCreated(function bodyOnCreated() {

  Meteor.subscribe('stockLists');

});

Template.appStocks.helpers({
  stocks() {
    return stockLists.find({});
  },
});

Template.appStocks.events({

});