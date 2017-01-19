
Template.seriesHomepage.onRendered(function() {
    // $('.cards .image').dimmer({
    //     on: 'hover'
    // });
});

Template.seriesHomepage.helpers({
    episodes: function() {
        return Episodes.find({seriesId: this._id});
    },

    seriesArcs: function() {
        return Arcs.find({seriesId: this._id});
    },

    "startDateFormatted": function(){
		if (this.releaseDate) {
			var m = moment(this.startDate).utc();
			return moment(m).format("MMMM Do YYYY");
		} else {
			return false;
		}
	}
});

Template.singleEpisode.helpers({
    episodeArcs: function() {
        return Arcs.find({episodeIds: this._id});
    },

    "startDateFormatted": function(){
        if (this.releaseDate) {
            var m = moment(this.startDate).utc();
            return moment(m).format("MMMM Do YYYY");
        } else {
            return false;
        }
    }
});

