var ERRORS_KEY = 'quoteErrors';
var NBBO = {};

Template.appStocks.onCreated(function stocksOnCreated() {

  Meteor.subscribe('stockLists');
  Meteor.subscribe('stockStats');
  if(Meteor.user()){
    Meteor.subscribe('transactionLists', Meteor.user()._id);
    Meteor.subscribe('quotes', Meteor.user()._id);
    Meteor.subscribe('users');
  }
  Session.set(ERRORS_KEY, {});
  
});

Template.appStocks.onRendered(function() {

    
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
    addQuote(price, stock, type, quantity); // create new quote

    if(hasSuchQuote(price, stock, type)){

      addToExistingQuote(price, stock, type, quantity);
      //console.log(1);

    }else{
      if(!hasMatchedQuote(price, stock, type)){

          createNewQuote(price, stock, type, quantity);
          //console.log(2);
      }else{

          var transactions = executeQuote(price, stock, type, quantity); //execute the quote
          postTransactions(transactions); // post transactions
          updateUserPositions(transactions);
          //  console.log(transcations);
      }
    }

    Router.go('processed'); //go to processed page
  },

  'change #stock' : function(event, template){
      if(template.$('[name=type]').val() == "Buy")
        template.$('[name=price]').val(NBBO[template.$('[name=stock]').val()].bestAsk);
      else
        template.$('[name=price]').val(NBBO[template.$('[name=stock]').val()].bestBid);

  },

  'click .stock' : function(){
      Session.set('SELECTED_STOCK', this.tradingSymbol);
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

function hasMatchedQuote(price, stock, bidOrAsk){

  var bidorask = bidOrAsk == "Sell" ? "BID" : "ASK"; // get opposite quote
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
  //console.log(update);
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
  //console.log(update);
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
    var update = {};
    while(quantity != 0){

        if(matched_quote_array[0].volumn > quantity){

            transaction_array.push(createTransaction(price, stock, bidOrAsk, quantity, matched_quote_array[0].user));
            matched_quote_array[0].volumn = matched_quote_array[0].volumn - quantity;
            if(update.tradingVolumn){
              update.tradingVolumn = update.tradingVolumn + Number(quantity);
            }else{
              update.tradingVolumn = Number(_stock.tradingVolumn) + Number(quantity); //update trading volumn
            }
            quantity = 0;
            _stock[bidorask][_price] = matched_quote_array;
            update[bidorask] = _stock[bidorask];

        }else if(matched_quote_array[0].volumn == quantity){

            transaction_array.push(createTransaction(price, stock, bidOrAsk, quantity, matched_quote_array[0].user));
            if(update.tradingVolumn){
              update.tradingVolumn = update.tradingVolumn + Number(quantity);
            }else{
              update.tradingVolumn = Number(_stock.tradingVolumn) + Number(quantity); //update trading volumn
            }
            quantity = 0;
            matched_quote_array = matched_quote_array.slice(1, matched_quote_array.length);
            _stock[bidorask][_price] = matched_quote_array;
            update[bidorask] = _stock[bidorask];
            if(matched_quote_array[0] == undefined){
              delete update[bidorask][_price];
            }


        }else{

             transaction_array.push(createTransaction(price, stock, bidOrAsk, matched_quote_array[0].volumn, matched_quote_array[0].user));
             if(update.tradingVolumn){
                update.tradingVolumn = update.tradingVolumn + Number(matched_quote_array[0].volumn);
             }else{
                update.tradingVolumn = Number(_stock.tradingVolumn) + Number(matched_quote_array[0].volumn);//update trading volumn
             }
             quantity = quantity - matched_quote_array[0].volumn;
             matched_quote_array = matched_quote_array.slice(1, matched_quote_array.length);
             _stock[bidorask][_price] = matched_quote_array;
             update[bidorask] = _stock[bidorask];
             if(matched_quote_array.length == 0 && quantity != 0){
                createNewQuote(price, stock, bidOrAsk, quantity); //put exceeding quote on order book
                delete update[bidorask][_price];
                quantity = 0;
             }
        }
    }

    stockLists.update({_id : _stock._id}, {$set : update});
    return transaction_array;
}

function createTransaction(price, stock, bidOrAsk, quantity, counterparty){

    var transaction = {};
    transaction.tradingSymbol= stock;
    transaction.time = new Date();
    transaction.price = price;
    transaction.volumn = quantity;

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

function postTransactions(transactions){
    _.each(transactions, function(transaction) { //insert transaction table
          transactionLists.insert({
            tradingSymbol: transaction.tradingSymbol,
            buyer: transaction.buyer,
            seller: transaction.seller,
            price: transaction.price,
            volumn: transaction.volumn,
            time: transaction.time
          });
    });
}

function updateUserPositions(transactions){
    _.each(transactions, function(transaction) {
       var update = {}; update.profile = {};
       //for seller
       if(transaction.seller != "System"){
           var seller_profile = Meteor.users.findOne({_id : transaction.seller}).profile;
           update.profile = seller_profile;
           update.profile.cash = Number(seller_profile.cash) + transaction.price * transaction.volumn
           update.profile[transaction.tradingSymbol] = seller_profile[transaction.tradingSymbol] - transaction.volumn;
           //console.log(update);
           Meteor.users.update({_id : transaction.seller}, {$set : update});
       }
       //for buyer
       update = {}; update.profile = {};
       if(transaction.buyer != "System"){

           var buyer_profile = Meteor.users.findOne({_id : transaction.buyer}).profile;
           update.profile = buyer_profile;
           update.profile.cash = buyer_profile.cash - transaction.price * transaction.volumn;

           if(buyer_profile[transaction.tradingSymbol] == undefined){

              update.profile[transaction.tradingSymbol] = transaction.volumn;

           }else{

              update.profile[transaction.tradingSymbol] = Number(buyer_profile[transaction.tradingSymbol]) + Number(transaction.volumn);

           }
           //console.log(update);
           Meteor.users.update({_id : transaction.buyer}, {$set : update});
       }


    });
}

function addQuote(price, stock, bidOrAsk, quantity){
    quotes.insert({
      quoter : Meteor.user()._id,
      price : price,
      tradingSymbol : stock,
      type : bidOrAsk,
      volumn : quantity,
      time : new Date()
    });
}


function getChangedNBBO(previous, current){
  var changedNBBO = {};
  _.each(previous, function(k, v){

    if(previous[k] < current[k]){
      changedNBBO[k] = 'increase';
    }else if(previous[k] > current[k]){
      changedNBBO[k] = 'decrease';
    }
  });
  return changedNBBO;
}

function isEqual(previous, current){

  _.each(previous, function(k, v){

    if(previous[k] != current[k]) return false;


  });
  return true;
}

function renderGraph(stockStat){

  nv.addGraph(function() {
        var chart = nv.models.candlestickBarChart()
            .x(function(d) { return d['date'] })
            .y(function(d) { return d['close'] })
            .duration(250)
            .margin({left: 75, bottom: 50});

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
                .axisLabel(stockStat.tradingSymbol)
                .tickFormat(function(d) {
                    // I didn't feel like changing all the above date values
                    // so I hack it to make each value fall on a different date
                    return d3.time.format('%x')(new Date(new Date() - (20000 * 86400000) + (d * 86400000)));
                });

        chart.yAxis
                .axisLabel('Stock Price')
                .tickFormat(function(d,i){ return '$' + d3.format(',.1f')(d); });



        d3.select("#chart1 svg")
                .datum([{values : stockStat.values}])
                .transition().duration(500)
                .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });

}
Tracker.autorun(function(){

    if(Session.get('SELECTED_STOCK') != undefined){
       var stockStat = stockStats.findOne({tradingSymbol : Session.get('SELECTED_STOCK')});
       if(stockStat != undefined){
        
          renderGraph(stockStat);
        
      }
    }else{

      Session.set('SELECTED_STOCK', 'MSFT');

    }
    
});