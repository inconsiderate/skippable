
Template.homepage.helpers({
	recentSeries: function() {
		var i = Series.find({}, {sort: {createdAt: -1}, limit: 3});

		if (i.count() > 0) {
			return i;
		}
	},
	"startDateFormatted": function(){
		var m = moment(this.startDate);
		return moment(m).format("MMMM Do YYYY");
	},
	randomSeries: function() {
		var randomnumber = Math.floor(Math.random() * (Series.find().count() - 1));
		return Series.findOne({}, {skip: randomnumber});
	}
});

Template.homepage.events({
	'submit #newSeriesForm': function(event) {
		event.preventDefault();
		var search = event.target.searchBox.value;

		Meteor.call('gatherSeriesData', search);
	}

});