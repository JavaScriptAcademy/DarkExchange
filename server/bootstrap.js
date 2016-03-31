// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (stockLists.find().count() === 0) {
    var data = [
      {companyName: "Microsoft.Corp", tradingSymbol: "MSFT", ASK: 80.02, BID: 80.00, tradingVolumn: 0},
      {companyName: "Google.Corp", tradingSymbol: "GOOG", ASK: 30.02, BID: 30.00, tradingVolumn: 0},
      {companyName: "Epam.Ltd", tradingSymbol: "EPM", ASK: 11.52, BID: 11.50, tradingVolumn: 0},
      {companyName: "Alibaba.Ltd", tradingSymbol: "ALIB", ASK: 20.02, BID: 20.00, tradingVolumn: 0}
    ];

    _.each(data, function(list) {
      stockLists.insert({
        companyName: list.companyName,
        tradingSymbol: list.tradingSymbol,
        ASK: list.ASK,
        BID: list.BID,
        tradingVolumn: list.tradingVolumn
      });
    });
  }
});
