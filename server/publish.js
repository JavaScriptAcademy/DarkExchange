
Meteor.publish('stockLists', function() {

  return stockLists.find({});

});

Meteor.publish('transactionLists', function(userid) {

  return transactionLists.find({$or: [{seller: userid}, {buyer: userid}]});

});

Meteor.publish('quotes', function(userid) {

  return quotes.find({quoter: userid});

});

Meteor.publish('users', function(){

  return Meteor.users.find({});

});

Meteor.publish('stockStats', function(){

  return stockStats.find({});
  
});