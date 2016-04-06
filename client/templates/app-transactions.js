Template.appTransactions.onCreated(function transactionsOnCreated() {

    Meteor.subscribe('transactionLists', Meteor.user()._id);

});

Template.appTransactions.onRendered(function() {

    if(Session.get("TRANSACTION_COUNT") != undefined){
        Session.set("TRANSACTION_COUNT", undefined);
    }
});

Template.appTransactions.helpers({

    transactions() {
      var _transactions = transactionLists.find({}).fetch();
      _.each(_transactions, function(transaction){

        if(transaction.buyer != Meteor.user()._id){
          transaction.buyer = "*";
        }else{
          transaction.buyer = "You";
        }
        if(transaction.seller != Meteor.user()._id){
          transaction.seller = "*";
        }else{
          transaction.seller = "You";
        }
      });
      return _transactions;

    },

    userid() {
      return Meteor.user()._id;
    },
});

Template.appTransactions.events({

});

Tracker.autorun(function () {

  var count = transactionLists.find({}).count();

  Session.set("TRANSACTION_COUNT", count);

});