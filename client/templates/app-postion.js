Template.appPosition.onCreated(function positionOnCreated() {

});

Template.appPosition.helpers({
    positions() {
      var positions = [];
      for(var position in Meteor.user().profile){
        var ob = {};
        ob.instrument = position;
        ob.amount = Meteor.user().profile[position];
        positions.push(ob);

      }
      return positions;
    }
});

Template.appPosition.events({


});