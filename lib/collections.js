stockLists = new Mongo.Collection('stockLists');
transactions = new Mongo.Collection('transactions');

var Schemas = {};

Schemas.stockList = new SimpleSchema({

   companyName : {type : String},
   tradingSymbol : {type : String},
   ASK : {type : Array},
   BID : {type : Array},
   "ASK.$" : {type : Object},
   "BID.$" : {type : Object},
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

Schemas.transcation = new SimpleSchema({

    seller : {type: String, optional: false},
    buyer : {type: String, optional: false},
    stock_name : {type: String, optional: false},
    volumn : {type: Number, optional: false},
    time : {type: Date, optional: false}
});

// Schemas.UserProfile = new SimpleSchema({

//     cashPosition : {type : Number, defaultValue : 10000},
//     stocksPosition : {type : Array, defaultValue : []},
//     "stocksPosition.$" : {type : Object}

// });

stockLists.attachSchema(Schemas.stockList);
transactions.attachSchema(Schemas.transcation);
Meteor.users.attachSchema(Schemas.User, {replace: true});