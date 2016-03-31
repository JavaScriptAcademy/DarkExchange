
Meteor.publish('stockLists', function() {

  return stockLists.find({});

});

