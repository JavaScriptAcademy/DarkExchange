Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [

       Meteor.subscribe('stockLists'),

    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.route('join');
Router.route('signin');

Router.route('/', {
  action: function(){
    this.render('appHome');
  }
});

Router.route('stocks', {
  path: '/stocks',
  action: function(){
    this.render('appStocks');
  }
});

Router.route('positions', {
  path: '/positions',
  action: function(){
    this.render('appPosition');
  }
});

Router.route('quotes', {
  path: '/quotes',
  action: function(){
    this.render('appQuotes');
  }
});

Router.route('transactions', {
  path: '/transactions',
  action: function(){
    this.render('appTransactions');
  }
});