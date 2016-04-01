// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (stockLists.find().count() === 0) {
    var data = [
      {companyName: "Microsoft.Corp", tradingSymbol: "MSFT", ASK:
        [
          {price : 80.06, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 80.04, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 80.02, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], BID:
        [
          {price : 80.00, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 79.98, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 79.96, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], tradingVolumn: 0
      },
      {companyName: "Google.Corp", tradingSymbol: "GOOG", ASK:
        [
          {price : 30.06, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 30.04, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 30.02, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], BID:
        [
          {price : 30.00, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 29.98, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 29.96, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], tradingVolumn: 0
      },
      {companyName: "Epam.Ltd", tradingSymbol: "EPM", ASK:
        [
          {price : 11.06, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 11.04, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 11.02, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], BID:
        [
          {price : 11.00, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 10.98, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 10.96, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], tradingVolumn: 0
      },
      {companyName: "Alibaba.Ltd", tradingSymbol: "ALIB", ASK:
        [
          {price : 50.06, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 50.04, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 50.02, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], BID:
        [
          {price : 50.00, quantity : 100, trader : "System", time : "2016-04-01 10:10:10"},
          {price : 49.98, quantity : 200, trader : "System", time : "2016-04-01 10:10:11"},
          {price : 49.96, quantity : 150, trader : "System", time : "2016-04-01 10:10:12"}
        ], tradingVolumn: 0
      }
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
