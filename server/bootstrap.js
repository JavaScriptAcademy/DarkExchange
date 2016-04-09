// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (stockLists.find().count() === 0) {
    var data = [
      {companyName: "Microsoft.Corp", tradingSymbol: "MSFT", ASK:
        {
          "70_02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "70_04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "70_06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "70_00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "69_98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "69_96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Google.Corp", tradingSymbol: "GOOG", ASK:
        {
          "50_02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "50_04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "50_06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "50_00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "49_98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "49_96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Epam.Ltd", tradingSymbol: "EPM", ASK:
        {
          "30_02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "30_04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "30_06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "30_00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "29_98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "29_96" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, tradingVolumn: 0
      },
      {companyName: "Alibaba.Ltd", tradingSymbol: "ALIB", ASK:
        {
          "10_02" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "10_04" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "10_06" : [
                      {"volumn" : 30, "user" : "System", "time" : "2016-03-26 15:22:33"},
                      {"volumn" : 40, "user" : "System", "time" : "2016-03-26 17:22:33"}
                    ]
        }, BID:
        {
          "10_00" : [
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 12:22:33"},
                      {"volumn" : 80, "user" : "System", "time" : "2016-03-26 13:22:33"}
                    ],
          "9_98" : [
                      {"volumn" : 180, "user" : "System", "time" : "2016-03-26 14:22:33"},
                      {"volumn" : 280, "user" : "System", "time" : "2016-03-26 15:22:33"}
                     ],
          "9_96" : [
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

  if (stockStats.find().count() === 0){

    var data1 = [
      {
        tradingSymbol : 'MSFT', 
        values : [
          {"date": 19965, "open": 68.68, "high": 69.06, "low": 68.11, "close": 68.59, "volume": 79695000, "adjusted": 68.59},
          {"date": 19966, "open": 69.1, "high": 69.28, "low": 68.19, "close": 68.59, "volume": 85209600, "adjusted": 68.59},
          {"date": 19967, "open": 68.94, "high": 69.85, "low": 68.49, "close": 68.71, "volume": 142388700, "adjusted": 68.71},
          {"date": 19968, "open": 69.99, "high": 70.81, "low": 69.9, "close": 70.66, "volume": 110438400, "adjusted": 70.66},
          {"date": 19969, "open": 70.28, "high": 70.97, "low": 70.05, "close": 70.95, "volume": 91116700, "adjusted": 70.95},
          {"date": 19972, "open": 70.57, "high": 70.96, "low": 70.35, "close": 70.7, "volume": 54072700, "adjusted": 70.7},
          {"date": 19973, "open": 70.37, "high": 70.74, "low": 69.35, "close": 69.73, "volume": 87495000, "adjusted": 69.73},
          {"date": 19974, "open": 69.19, "high": 69.43, "low": 68.55, "close": 69.18, "volume": 84854700, "adjusted": 69.18},
          {"date": 19975, "open": 69.98, "high": 70.18, "low": 68.93, "close": 69.8, "volume": 102181300, "adjusted": 69.8},
          {"date": 19976, "open": 69.58, "high": 70.1, "low": 68.72, "close": 69.31, "volume": 91757700, "adjusted": 69.31},
          {"date": 19979, "open": 68.46, "high": 69.31, "low": 68.38, "close": 69.11, "volume": 68593300, "adjusted": 69.11},
          {"date": 19980, "open": 69.41, "high": 69.9, "low": 68.41, "close": 69.61, "volume": 80806000, "adjusted": 69.61},
          {"date": 19981, "open": 69.53, "high": 69.8, "low": 68.7, "close": 68.74, "volume": 79829200, "adjusted": 68.74},
          {"date": 19982, "open": 67.41, "high": 67.43, "low": 66.09, "close": 66.38, "volume": 152931800, "adjusted": 66.38},
          {"date": 19983, "open": 66.06, "high": 66.63, "low": 65.5, "close": 65.83, "volume": 130868200, "adjusted": 65.83},
          {"date": 19986, "open": 65.64, "high": 66.21, "low": 64.76, "close": 64.77, "volume": 96437600, "adjusted": 64.77},
          {"date": 19987, "open": 65.04, "high": 66.2, "low": 64.86, "close": 65.58, "volume": 89294400, "adjusted": 65.58},
          {"date": 19988, "open": 65.12, "high": 66.03, "low": 64.19, "close": 64.56, "volume": 159530500, "adjusted": 64.56},
          {"date": 19989, "open": 64.9, "high": 66.3, "low": 64.89, "close": 66.06, "volume": 101471400, "adjusted": 66.06},
          {"date": 19990, "open": 66.55, "high": 66.83, "low": 65.77, "close": 66.62, "volume": 90888900, "adjusted": 66.62},
          {"date": 19993, "open": 66.79, "high": 67.3, "low": 65.89, "close": 66, "volume": 89702100, "adjusted": 66},
          {"date": 19994, "open": 64.36, "high": 66, "low": 63.21, "close": 63.33, "volume": 158619400, "adjusted": 63.33},
          {"date": 19995, "open": 63.26, "high": 64.49, "low": 63.05, "close": 63.91, "volume": 108113000, "adjusted": 63.91},
          {"date": 19996, "open": 63.55, "high": 65.04, "low": 63.4, "close": 64.17, "volume": 119200500, "adjusted": 64.17},
          {"date": 19997, "open": 64.51, "high": 64.53, "low": 63.17, "close": 63.65, "volume": 134560800, "adjusted": 63.65},
          {"date": 20001, "open": 65.23, "high": 65.58, "low": 63.7, "close": 64.39, "volume": 142322300, "adjusted": 64.39},
          {"date": 20002, "open": 64.43, "high": 66.03, "low": 64.13, "close": 65.75, "volume": 97304000, "adjusted": 65.75},
          {"date": 20003, "open": 65.85, "high": 66.4, "low": 65.73, "close": 65.96, "volume": 62930500, "adjusted": 65.96}
       ]
      },
      {
        tradingSymbol : "ALIB", 
        values : [
          {"date": 19965, "open": 8.68, "high": 9.06, "low": 8.11, "close": 8.59, "volume": 79695000, "adjusted": 8.59},
          {"date": 19966, "open": 9.1, "high": 9.28, "low": 8.19, "close": 8.59, "volume": 85209600, "adjusted": 8.59},
          {"date": 19967, "open": 8.94, "high": 9.85, "low": 8.49, "close": 8.71, "volume": 142388700, "adjusted": 8.71},
          {"date": 19968, "open": 9.99, "high": 10.81, "low": 9.9, "close": 8.66, "volume": 110438400, "adjusted": 10.66},
          {"date": 19969, "open": 10.28, "high": 10.97, "low": 10.05, "close": 8.95, "volume": 91116700, "adjusted": 10.95},
          {"date": 19972, "open": 10.57, "high": 10.96, "low": 10.35, "close": 8.7, "volume": 54072700, "adjusted": 10.7},
          {"date": 19973, "open": 10.37, "high": 10.74, "low": 9.35, "close": 9.73, "volume": 87495000, "adjusted": 10.73},
          {"date": 19974, "open": 9.19, "high": 9.43, "low": 8.55, "close": 9.18, "volume": 84854700, "adjusted": 9.18},
          {"date": 19975, "open": 9.98, "high": 10.18, "low": 8.93, "close": 9.8, "volume": 102181300, "adjusted": 9.8},
          {"date": 19976, "open": 9.58, "high": 10.1, "low": 8.72, "close": 9.31, "volume": 91757700, "adjusted": 9.31},
          {"date": 19979, "open": 8.46, "high": 9.31, "low": 8.38, "close": 9.11, "volume": 68593300, "adjusted": 9.11},
          {"date": 19980, "open": 9.41, "high": 9.9, "low": 8.41, "close": 9.61, "volume": 80806000, "adjusted": 9.61},
          {"date": 19981, "open": 9.53, "high": 9.8, "low": 8.7, "close": 8.74, "volume": 79829200, "adjusted": 8.74},
          {"date": 19982, "open": 7.41, "high": 7.43, "low": 6.09, "close": 6.38, "volume": 152931800, "adjusted": 6.38},
          {"date": 19983, "open": 6.06, "high": 6.63, "low": 5.5, "close": 5.83, "volume": 130868200, "adjusted": 5.83},
          {"date": 19986, "open": 5.64, "high": 6.21, "low": 4.76, "close": 4.77, "volume": 96437600, "adjusted": 4.77},
          {"date": 19987, "open": 5.04, "high": 6.2, "low": 4.86, "close": 5.58, "volume": 89294400, "adjusted": 5.58},
          {"date": 19988, "open": 5.12, "high": 6.03, "low": 4.19, "close": 4.56, "volume": 159530500, "adjusted": 4.56},
          {"date": 19989, "open": 4.9, "high": 6.3, "low": 4.89, "close": 6.06, "volume": 101471400, "adjusted": 6.06},
          {"date": 19990, "open": 6.55, "high": 6.83, "low": 5.77, "close": 6.62, "volume": 90888900, "adjusted": 6.62},
          {"date": 19993, "open": 6.79, "high": 7.3, "low": 5.89, "close": 6, "volume": 89702100, "adjusted": 6},
          {"date": 19994, "open": 4.36, "high": 6, "low": 3.21, "close": 3.33, "volume": 158619400, "adjusted": 3.33},
          {"date": 19995, "open": 3.26, "high": 4.49, "low": 3.05, "close": 3.91, "volume": 108113000, "adjusted": 3.91},
          {"date": 19996, "open": 3.55, "high": 5.04, "low": 3.4, "close": 4.17, "volume": 119200500, "adjusted": 4.17},
          {"date": 19997, "open": 4.51, "high": 4.53, "low": 3.17, "close": 3.65, "volume": 134560800, "adjusted": 3.65},
          {"date": 20001, "open": 5.23, "high": 5.58, "low": 3.7, "close": 4.39, "volume": 142322300, "adjusted": 4.39},
          {"date": 20002, "open": 4.43, "high": 6.03, "low": 4.13, "close": 5.75, "volume": 97304000, "adjusted": 5.75},
          {"date": 20003, "open": 5.85, "high": 6.4, "low": 5.73, "close": 5.96, "volume": 62930500, "adjusted": 5.96}
       ]
      },
      {
        tradingSymbol : 'GOOG', 
        values : [
          {"date": 19965, "open": 58.68, "high": 59.06, "low": 58.11, "close": 58.59, "volume": 79695000, "adjusted": 58.59},
          {"date": 19966, "open": 59.1, "high": 59.28, "low": 58.19, "close": 58.59, "volume": 85209600, "adjusted": 58.59},
          {"date": 19967, "open": 58.94, "high": 59.85, "low": 58.49, "close": 58.71, "volume": 142388700, "adjusted": 58.71},
          {"date": 19968, "open": 59.99, "high": 60.81, "low": 59.9, "close": 60.66, "volume": 110438400, "adjusted": 60.66},
          {"date": 19969, "open": 60.28, "high": 62.97, "low": 58.05, "close": 60.95, "volume": 91116700, "adjusted": 60.95},
          {"date": 19972, "open": 60.57, "high": 60.96, "low": 60.35, "close": 60.7, "volume": 54072700, "adjusted": 60.7},
          {"date": 19973, "open": 60.37, "high": 60.74, "low": 59.35, "close": 59.73, "volume": 87495000, "adjusted": 60.73},
          {"date": 19974, "open": 59.19, "high": 59.43, "low": 58.55, "close": 59.18, "volume": 84854700, "adjusted": 59.18},
          {"date": 19975, "open": 59.98, "high": 60.18, "low": 58.93, "close": 59.8, "volume": 102181300, "adjusted": 59.8},
          {"date": 19976, "open": 58.58, "high": 60.1, "low": 57.72, "close": 59.31, "volume": 91757700, "adjusted": 59.31},
          {"date": 19979, "open": 58.46, "high": 59.31, "low": 58.38, "close": 59.11, "volume": 68593300, "adjusted": 59.11},
          {"date": 19980, "open": 59.41, "high": 59.9, "low": 58.41, "close": 59.61, "volume": 80806000, "adjusted": 59.61},
          {"date": 19981, "open": 59.53, "high": 59.8, "low": 58.7, "close": 58.74, "volume": 79829200, "adjusted": 58.74},
          {"date": 19982, "open": 57.41, "high": 57.43, "low": 56.09, "close": 56.38, "volume": 152931800, "adjusted": 56.38},
          {"date": 19983, "open": 56.06, "high": 56.63, "low": 55.5, "close": 55.83, "volume": 130868200, "adjusted": 55.83},
          {"date": 19986, "open": 55.64, "high": 56.21, "low": 54.76, "close": 54.77, "volume": 96437600, "adjusted": 54.77},
          {"date": 19987, "open": 54.04, "high": 56.2, "low": 54.86, "close": 55.58, "volume": 89294400, "adjusted": 55.58},
          {"date": 19988, "open": 55.12, "high": 56.03, "low": 54.19, "close": 54.56, "volume": 159530500, "adjusted": 54.56},
          {"date": 19989, "open": 54.9, "high": 56.3, "low": 54.89, "close": 56.06, "volume": 101471400, "adjusted": 56.06},
          {"date": 19990, "open": 58.55, "high": 56.83, "low": 55.77, "close": 56.62, "volume": 90888900, "adjusted": 56.62},
          {"date": 19993, "open": 56.79, "high": 57.3, "low": 55.89, "close": 56, "volume": 89702100, "adjusted": 56},
          {"date": 19994, "open": 54.36, "high": 56, "low": 53.21, "close": 53.33, "volume": 158619400, "adjusted": 53.33},
          {"date": 19995, "open": 53.26, "high": 54.49, "low": 53.05, "close": 53.91, "volume": 108113000, "adjusted": 53.91},
          {"date": 19996, "open": 54.55, "high": 55.04, "low": 53.4, "close": 54.17, "volume": 119200500, "adjusted": 54.17},
          {"date": 19997, "open": 54.51, "high": 54.53, "low": 53.17, "close": 53.65, "volume": 134560800, "adjusted": 53.65},
          {"date": 20001, "open": 55.23, "high": 55.58, "low": 53.7, "close": 54.39, "volume": 142322300, "adjusted": 54.39},
          {"date": 20002, "open": 54.43, "high": 56.03, "low": 54.13, "close": 55.75, "volume": 97304000, "adjusted": 55.75},
          {"date": 20003, "open": 55.85, "high": 56.4, "low": 55.73, "close": 55.96, "volume": 62930500, "adjusted": 55.96}
       ]
      },
      {
        tradingSymbol : 'EPM', 
        values : [
          {"date": 19965, "open": 28.68, "high": 29.06, "low": 28.11, "close": 28.59, "volume": 79695000, "adjusted": 28.59},
          {"date": 19966, "open": 29.1, "high": 29.28, "low": 28.19, "close": 28.59, "volume": 85209600, "adjusted": 28.59},
          {"date": 19967, "open": 28.94, "high": 29.85, "low": 28.49, "close": 28.71, "volume": 142388700, "adjusted": 28.71},
          {"date": 19968, "open": 29.99, "high": 30.81, "low": 29.9, "close": 30.66, "volume": 110438400, "adjusted": 30.66},
          {"date": 19969, "open": 30.28, "high": 30.97, "low": 30.05, "close": 30.95, "volume": 91116700, "adjusted": 30.95},
          {"date": 19972, "open": 30.57, "high": 30.96, "low": 30.35, "close": 30.7, "volume": 54072700, "adjusted": 30.7},
          {"date": 19973, "open": 30.37, "high": 30.74, "low": 29.35, "close": 29.73, "volume": 87495000, "adjusted": 30.73},
          {"date": 19974, "open": 30.19, "high": 29.43, "low": 28.55, "close": 29.18, "volume": 84854700, "adjusted": 29.18},
          {"date": 19975, "open": 29.98, "high": 30.18, "low": 28.93, "close": 29.8, "volume": 102181300, "adjusted": 29.8},
          {"date": 19976, "open": 29.58, "high": 30.1, "low": 27.72, "close": 29.31, "volume": 91757700, "adjusted": 29.31},
          {"date": 19979, "open": 28.46, "high": 31.31, "low": 28.38, "close": 29.11, "volume": 68593300, "adjusted": 29.11},
          {"date": 19980, "open": 29.41, "high": 29.9, "low": 28.41, "close": 29.61, "volume": 80806000, "adjusted": 29.61},
          {"date": 19981, "open": 29.53, "high": 29.8, "low": 28.7, "close": 28.74, "volume": 79829200, "adjusted": 28.74},
          {"date": 19982, "open": 27.41, "high": 27.43, "low": 26.09, "close": 26.38, "volume": 152931800, "adjusted": 26.38},
          {"date": 19983, "open": 26.06, "high": 28.63, "low": 25.5, "close": 25.83, "volume": 130868200, "adjusted": 25.83},
          {"date": 19986, "open": 25.64, "high": 26.21, "low": 24.76, "close": 24.77, "volume": 96437600, "adjusted": 24.77},
          {"date": 19987, "open": 25.04, "high": 26.2, "low": 24.86, "close": 25.58, "volume": 89294400, "adjusted": 25.58},
          {"date": 19988, "open": 25.12, "high": 26.03, "low": 24.19, "close": 24.56, "volume": 159530500, "adjusted": 24.56},
          {"date": 19989, "open": 24.9, "high": 26.3, "low": 24.89, "close": 26.06, "volume": 101471400, "adjusted": 26.06},
          {"date": 19990, "open": 26.55, "high": 26.83, "low": 25.77, "close": 26.62, "volume": 90888900, "adjusted": 26.62},
          {"date": 19993, "open": 26.79, "high": 27.3, "low": 25.89, "close": 26, "volume": 89702100, "adjusted": 26},
          {"date": 19994, "open": 24.36, "high": 26, "low": 23.21, "close": 23.33, "volume": 158619400, "adjusted": 23.33},
          {"date": 19995, "open": 24.26, "high": 24.49, "low": 23.05, "close": 23.91, "volume": 108113000, "adjusted": 23.91},
          {"date": 19996, "open": 24.55, "high": 25.04, "low": 23.4, "close": 24.17, "volume": 119200500, "adjusted": 24.17},
          {"date": 19997, "open": 24.51, "high": 24.53, "low": 23.17, "close": 23.65, "volume": 134560800, "adjusted": 23.65},
          {"date": 20001, "open": 25.23, "high": 25.58, "low": 23.7, "close": 24.39, "volume": 142322300, "adjusted": 24.39},
          {"date": 20002, "open": 24.43, "high": 26.03, "low": 24.13, "close": 25.75, "volume": 97304000, "adjusted": 25.75},
          {"date": 20003, "open": 25.85, "high": 26.4, "low": 25.73, "close": 25.96, "volume": 62930500, "adjusted": 25.96}
       ]
      }
    ];
    _.each(data1, function(list1) {
      stockStats.insert({
        tradingSymbol: list1.tradingSymbol,
        values : list1.values
      });
    });
  }
});
