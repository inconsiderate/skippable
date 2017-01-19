
Template.header.events({
  	'click #navigation-home': function () {
    	Router.go('/');
  	},
  	'click #navigation-series': function () {
    	Router.go('/series');
  	}
});

Template.header.onRendered(function() {
	// $('.tooltip-popup').popup();
});