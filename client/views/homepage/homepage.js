
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
	'submit #click-me': function(event) {
		event.preventDefault();
		var search = event.target.searchBox.value;

		var result = Meteor.call('gatherSeriesData', search);
		console.log(result);
	}

})