var ERRORS_KEY = 'quoteErrors';
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

      var bids_price = Object.keys(bids);
      var asks_price = Object.keys(asks);

      stock.bestBid = Math.max(bids_price).toFixed(2);
      stock.bestAsk = Math.min(asks_price).toFixed(2);
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
      errors.nosuchstock = 'You dont own any stocks of ' + stock;
    }
    if (type == "Sell" && Meteor.user().profile[stock] < quantity){
      errors.noenoughstock = 'You dont own enough stocks of ' + stock;
    }
    if (type == "Buy" && Meteor.user().profile.cash < quantity * price ){
      errors.noenoughmoney = 'You dont have sufficient money to buy ' + quantity + ' shares of ' + stock;
    }


    Session.set(ERRORS_KEY, errors);

    if (_.keys(errors).length) {
      return;
    }

    hasSuchQuote(price, stock, type);
  },

});

function hasSuchQuote(price, stock, bidOrAsk){
  bidOrAsk = bidOrAsk == "Buy" ? "BID" : "ASK";
  var _stock = stockLists.findOne({tradingSymbol : stock});
  var _bidOrAsk = _stock[bidOrAsk];

  for(var i = 0; i < _bidOrAsk.length; i++){
    if(_bidOrAsk[i].price == price){
      return ;
    }
  }



}