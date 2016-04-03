var ERRORS_KEY = 'quoteErrors';
var NBBO = {};

Template.appStocks.onCreated(function bodyOnCreated() {

  Meteor.subscribe('stockLists');
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

      addToOrderBook(price, stock, type, quantity);

    }else{
      if((type == "Sell" && price > NBBO[stock].bestAsk) || (type == "Buy" && price < NBBO[stock].bestBid)){
          addToOrderBook(price, stock, type, quantity);
      }else{
          executeTranscation(price, stock, type, quantity);
      }
    }
  },

});

function hasSuchQuote(price, stock, bidOrAsk){

  bidOrAsk = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidOrAsk];
  var _price = Number(price).toFixed(2);
  
  _price = _price.replace("." , "_"); 
  
  return _bidOrAsk[_price] != undefined;
}

function addToOrderBook(price, stock, bidOrAsk, quantity){

  var update = {};
  bidOrAsk = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidOrAsk];
  var _price = Number(price).toFixed(2);
  _price = _price.replace("." , "_"); 
  _bidOrAsk[_price].push({
      volumn : quantity, 
      user : Meteor.user()._id,
      time : Date()
  });
  
  //more code here

  _stock[bidOrAsk][_price] = _bidOrAsk[_price];
  update[bidOrAsk] = _stock[bidOrAsk];
  stockLists.update({_id : _stock._id}, {$set : update});
}


function convertToNumbers(arr){
  
  for(var i = 0; i < arr.length; i++){
    arr[i] = Number(arr[i].replace("_" , "."));
  }
  return arr;
}

function executeTranscation(price, stock, type, quantity){
    console.log('execute it');
}