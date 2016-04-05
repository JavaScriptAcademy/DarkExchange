Template.appTransactions.onCreated(function transactionsOnCreated() {

    Meteor.subscribe('transactionLists', Meteor.user()._id);

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