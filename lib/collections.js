stockLists = new Mongo.Collection('stockLists');

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
        type : Array,
        optional : true,
        blackbox: true,
        defaultValue: [{instrument : "cash", amount : 10000}]
    },
     "profile.$": {
        type: Object
    }
});

// Schemas.UserProfile = new SimpleSchema({

//     cashPosition : {type : Number, defaultValue : 10000},
//     stocksPosition : {type : Array, defaultValue : []},
//     "stocksPosition.$" : {type : Object}

// });

stockLists.attachSchema(Schemas.stockList);
Meteor.users.attachSchema(Schemas.User, {replace: true});