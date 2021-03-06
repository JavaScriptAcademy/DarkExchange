stockLists = new Mongo.Collection('stockLists');
transactionLists = new Mongo.Collection('transactionLists');
quotes = new Mongo.Collection('quotes');
stockStats = new Mongo.Collection('stockStats');

Meteor.users.allow({

  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },

});

stockLists.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
});

transactionLists.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
});

quotes.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
});

var Schemas = {};

Schemas.stockList = new SimpleSchema({

   companyName : {type : String},
   tradingSymbol : {type : String},
   ASK : {type : Object, blackbox: true},
   BID : {type : Object, blackbox: true},
   tradingVolumn : {type : Number}

});

Schemas.User = new SimpleSchema({

    emails: {
        type: Array,
        optional: false
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    profile: {
        type : Object,
        optional : true,
        blackbox: true,
        defaultValue: {cash : 10000}
    }
});

Schemas.transactionList = new SimpleSchema({

    seller : {type: String, optional: false},
    buyer : {type: String, optional: false},
    tradingSymbol : {type: String, optional: false},
    price : {type: String, optional: false},
    volumn : {type: Number, optional: false},
    time : {type: Date, optional: false}
});


Schemas.quote = new SimpleSchema({

    quoter : {type: String, optional: false},
    price : {type: String, optional: false},
    type : {type: String, optional: false},
    tradingSymbol : {type: String, optional: false},
    volumn : {type: String, optional: false},
    time : {type: Date, optional: false}

});

Schemas.stockStat = new SimpleSchema({

    tradingSymbol : {type : String, optional : false},
    values : {type : Array, optional : false, blackbox : true},
    "values.$" : {type : Object}
});

stockLists.attachSchema(Schemas.stockList);
transactionLists.attachSchema(Schemas.transactionList);
quotes.attachSchema(Schemas.quote);
stockStats.attachSchema(Schemas.stockStat);
Meteor.users.attachSchema(Schemas.User, {replace: true});