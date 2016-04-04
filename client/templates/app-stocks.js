var ERRORS_KEY = 'quoteErrors';
var NBBO = {};

Template.appStocks.onCreated(function bodyOnCreated() {

  Meteor.subscribe('stockLists');
  Meteor.subscribe('transactionLists');
  Session.set(ERRORS_KEY, {});

});

Template.appStocks.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  stocks() {

    var stocks = stockLists.find({});
    var stocks_info = [];
  
    stocks.forEach(function(stock){

      var bids = stock.BID;
      var asks = stock.ASK;

      var bids_price = convertToNumbers(Object.keys(bids));
      var asks_price = convertToNumbers(Object.keys(asks));

      stock.bestBid = Math.max(...bids_price).toFixed(2);
      stock.bestAsk = Math.min(...asks_price).toFixed(2);

      NBBO[stock.tradingSymbol] = {};
      NBBO[stock.tradingSymbol].bestBid = stock.bestBid;
      NBBO[stock.tradingSymbol].bestAsk = stock.bestAsk;

      stocks_info.push(stock);
    });
    return stocks_info;
  },
});

Template.appStocks.events({

  "submit form": function(event, template){

    event.preventDefault();

    var errors = {};

    var type = template.$('[name=type]').val();
    var stock = template.$('[name=stock]').val();
    var price = template.$('[name=price]').val();
    var quantity = template.$('[name=quantity]').val();

    if (type == "Sell" && Meteor.user().profile[stock] == undefined){
      errors.nosuchstock = 'You don\'t own any stocks of ' + stock;
    }
    if (type == "Sell" && Meteor.user().profile[stock] < quantity){
      errors.noenoughstock = 'You don\'t own enough stocks of ' + stock;
    }
    if (type == "Buy" && Meteor.user().profile.cash < quantity * price ){
      errors.noenoughmoney = 'You don\'t have sufficient money to buy ' + quantity + ' shares of ' + stock;
    }


    Session.set(ERRORS_KEY, errors);

    if (_.keys(errors).length) {
      return;
    }

    if(hasSuchQuote(price, stock, type)){

      addToExistingQuote(price, stock, type, quantity);
      //console.log(1);

    }else{
      if((type == "Sell" && price > NBBO[stock].bestAsk) || (type == "Buy" && price < NBBO[stock].bestBid)){
          
          createNewQuote(price, stock, type, quantity);
          //console.log(2);
      }else{
          
          var transcations = executeQuote(price, stock, type, quantity); //execute the quote
          _.each(transactions, function(transaction) { //update transaction table
            transactionLists.insert({
              tradingSymbol: transaction.tradingSymbol,
              buyer: transaction.buyer,
              seller: transaction.seller,
              price: transaction.price,
              volumn: transaction.volumn,
              time: transaction.time
            });
          });
          //console.log(3);
      }
    }
  },

});

function hasSuchQuote(price, stock, bidOrAsk){

  var bidorask = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidorask];
  var _price = Number(price).toFixed(2);
  
  _price = _price.replace("." , "_"); 
  
  return _bidOrAsk[_price] != undefined;
}

function addToExistingQuote(price, stock, bidOrAsk, quantity){

  var update = {};
  var bidorask = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidorask];
  var _price = Number(price).toFixed(2);
  _price = _price.replace("." , "_"); 
  _bidOrAsk[_price].push({
      volumn : quantity, 
      user : Meteor.user()._id,
      time : Date()
  });

  _stock[bidorask][_price] = _bidOrAsk[_price];
  update[bidorask] = _stock[bidorask];
  stockLists.update({_id : _stock._id}, {$set : update});
}

function createNewQuote(price, stock, bidOrAsk, quantity){

  var update = {};
  var bidorask = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidorask];
  var _price = Number(price).toFixed(2);
  _price = _price.replace("." , "_"); 
  _bidOrAsk[_price] = 
    [
      {
        volumn : quantity, 
        user : Meteor.user()._id,
        time : Date()
      }
    ];

  _stock[bidorask] = _bidOrAsk;
  update[bidorask] = _stock[bidorask];
  stockLists.update({_id : _stock._id}, {$set : update});
}

function convertToNumbers(arr){
  
  for(var i = 0; i < arr.length; i++){
    arr[i] = Number(arr[i].replace("_" , "."));
  }
  return arr;
}

function executeQuote(price, stock, bidOrAsk, quantity){
    //console.log('execute it');
    var transaction_array = [];
    var bidorask = bidOrAsk == "Sell" ? "BID" : "ASK"; //get the opposite type to match
    var _stock = stockLists.findOne({tradingSymbol : stock});
    var _bidOrAsk = _stock[bidorask];
    var _price = Number(price).toFixed(2);
    _price = _price.replace("." , "_"); 
    var matched_quote_array = _stock[bidorask][_price] //get the matched quote array 
    while(quantity != 0){
      var update = {};
        if(matched_quote_array[0].volumn > quantity){

            transaction_array.push(createTransaction(price, stock, bidOrAsk, quantity, matched_quote_array[0].user));
            matched_quote_array[0].volumn = matched_quote_array - quantity;
            quantity = 0;
            _stock[bidorask][_price] = matched_quote_array;
            update[bidorask] = _stock[bidorask];
            stockLists.update({_id : _stock._id}, {$set : update});


        }else if(matched_quote_array[0].volumn = quantity){
           
            transaction_array.push(createTransaction(price, stock, bidOrAsk, quantity, matched_quote_array[0].user));
            quantity = 0;
            matched_quote_array.splice(0, 1);
            _stock[bidorask][_price] = matched_quote_array;
            update[bidorask] = _stock[bidorask];
            if(matched_quote_array[0] == undefined){
              delete update[bidorask][_price];
            }
            stockLists.update({_id : _stock._id}, {$set : update});

        }else{
             
             transaction_array.push(createTransaction(price, stock, bidOrAsk, quantity, matched_quote_array[0].user));
             quantity = quantity - matched_quote_array[0].volumn;
             matched_quote_array.splice(0, 1);
             _stock[bidorask][_price] = matched_quote_array;
             update[bidorask] = _stock[bidorask];
             if(matched_quote_array[0] == undefined){
                createNewQuote(price, stock, bidOrAsk, quantity); //put exceeding quote on order book
                delete update[bidorask][_price];
             }
             stockLists.update({_id : _stock._id}, {$set : update});    
        }
    }
    return transaction_array;
}

function createTransaction(price, stock, bidOrAsk, quantity, counterparty){

    var transaction = {};
    transaction.time = new Date();
    transaction.price = price;
    transaction.quantity = quantity;

    if(bidOrAsk == "Sell"){
      transaction.seller = Meteor.user()._id;
      transaction.buyer = counterparty;
    }else{
      transaction.buyer = Meteor.user()._id;
      transaction.seller = counterparty;
    }
    return transaction;
}
//1. need to update users table
//2. need to show alert when transaction executed
//3. need to jump to confirm page after quote