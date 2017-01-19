
Template.seriesList.helpers({
    allSeries: function() {
        return Series.find({}, {sort: { title: 1 }});
    }
});

Template.seriesList.helpers({
    "startDateFormatted": function(){
        if (this.releaseDate) {
            var m = moment(this.startDate).utc();
            return moment(m).format("MMMM Do YYYY");
        } else {
            return false;
        }
    }
});