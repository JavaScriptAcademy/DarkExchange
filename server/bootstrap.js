// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (stockLists.find().count() === 0) {
    var data = [
      {companyName: "Microsoft.Corp", tradingSymbol: "MSFT", ASK:
        {
          "70.02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "70.04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "70.06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "70.00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "69.98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "69.96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Google.Corp", tradingSymbol: "GOOG", ASK:
        {
          "70.02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "70.04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "70.06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "70.00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "69.98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "69.96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Epam.Ltd", tradingSymbol: "EPM", ASK:
        {
          "70.02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "70.04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "70.06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "70.00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "69.98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "69.96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Alibaba.Ltd", tradingSymbol: "ALIB", ASK:
        {
          "70.02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "70.04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "70.06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "70.00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "69.98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "69.96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
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
