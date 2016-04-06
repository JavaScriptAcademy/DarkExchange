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

      return transactionLists.find({});

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