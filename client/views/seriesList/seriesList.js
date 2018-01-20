
Template.seriesList.helpers({
    allSeries: function() {
        return Series.find({}, {sort: { title: 1 }});
    }
});

Template.singleSeries.helpers({
    startDateFormatted: function(){
        if (this.startDate) {
            var m = moment(this.startDate).utc();
            return moment(m).format("MMMM Do YYYY");
        } else {
            return false;
        }
    }
});