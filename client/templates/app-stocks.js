Template.appStocks.onCreated(function bodyOnCreated() {

  Meteor.subscribe('stockLists');

});

Template.appStocks.helpers({
  stocks() {

    var stocks = stockLists.find({});
    var stocks_info = [];
    stocks.forEach(function(stock){

      var bids = stock.BID;
      var asks = stock.ASK;
      var bestBid = bids[0].price;
      var bestAsk = asks[0].price
      for(var i = 1; i < bids.length; i++){
        if(bids[i].price > bestBid) bestBid = bids[i].price;
      }
      for(var i = 1; i < asks.length; i++){
        if(asks[i].price < bestAsk) bestAsk = asks[i].price;
      }
      stock.bestBid = bestBid.toFixed(2);
      stock.bestAsk = bestAsk.toFixed(2);
      stocks_info.push(stock);
    });

    return stocks_info;
  },
});

Template.appStocks.events({

});