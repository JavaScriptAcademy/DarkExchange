Template.appPosition.onCreated(function bodyOnCreated() {

});

Template.appPosition.helpers({
    positions() {

      var positions = Meteor.user().profile;

      return positions;
    }
});

Template.appPosition.events({


});