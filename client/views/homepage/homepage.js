

Template.homepage.helpers({
	recentSeries: function() {
		var i = Series.find({});

		if (i.count() > 0) {
			return i;
		}
	},
	
	"startDateFormatted": function(){
		var m = moment(this.startDate);
		return moment(m).format("MMMM Do YYYY");
	}

});
