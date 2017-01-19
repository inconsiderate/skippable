
Template.homepage.helpers({
	recentSeries: function() {
		var i = Series.find({}, {limit: 3});

		if (i.count() > 0) {
			return i;
		}
	},
	
	"startDateFormatted": function(){
		var m = moment(this.startDate);
		return moment(m).format("MMMM Do YYYY");
	}

});


Template.homepage.events({
	'click #click-me-hard': function(event) {

		var result = Meteor.call(pullShit, 1);
		console.log(result);
	}

})