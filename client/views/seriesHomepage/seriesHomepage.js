
Template.seriesHomepage.onRendered(function() {

});

Template.seriesHomepage.helpers({
    currentSeries: function() {
        return Series.findOne({slug: Router.current().params._slug});
    },

    filteredEpisodes: function() {
        this.episode_filter.dep.depend();
        var query = this.episode_filter.query;

        console.log(query);
        if (query == null) {
            return Episodes.find();
        } else {
            return Episodes.find(query);
        }
    },

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

Template.singleArcButton.events({
    'click .ui.button': function(event) {
        var parent = Template.parentData(2);
        parent.episode_filter.dep.depend();
        var id = $(event.target).attr('id');
        var query = parent.episode_filter.query;

        $(event.target).toggleClass('inverted');
        if (query != null) {
            i = query.arcIds.$all.indexOf(id);
            console.log(i);
            if(i != -1) {
                console.log('inside');
                query.arcIds.$all.splice(i, 1);
            } else {
                query.arcIds.$all.push(id)
            }
        } else {
            query = {arcIds: {$all: [id]}};
        }

        if (query != null && query.arcIds.$all.length == 0) {
            query = null;
        }

        parent.episode_filter.query = query;
        parent.episode_filter.dep.changed();
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

