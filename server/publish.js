// Meteor.publish('users', function(){

//   return users.find({}, { profile: 1, _id:1 });

// });

Meteor.publish('stockLists', function() {

  return stockLists.find({});

});

Meteor.publish('transactionLists', function(userid) {

  return transactionLists.find({$or: [{seller: userid}, {buyer: userid}]});

});

Meteor.publish('quotes', function(userid) {

  return quotes.find({quoter: userid});

});

