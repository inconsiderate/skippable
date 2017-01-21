
Template.seriesHomepage.onRendered(function() {
    $('.ui.accordion').accordion();
});

Template.seriesHomepage.helpers({
    currentSeries: function() {
        return Series.findOne({slug: Router.current().params._slug});
    },

    filteredEpisodes: function() {
        this.episode_filter.dep.depend();
        var query = this.episode_filter.query;
        if (query == null) {
            return Episodes.find({}, {sort: {season: 1, number: 1}});
        } else {
            return Episodes.find(query, {sort: {season: 1, number: 1}});
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

Template.seriesHomepage.events({
    'click #newTagSubmit': function(event) {
        var arc = $('#newTagInput').val();
        var series = this._id;

        Meteor.call('addArcToSeason', arc, series);

        $('#newTagInput').val('');
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
            if(i != -1) {
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

    episodeArcChoices: function() {

        return Arcs.find( { episodeIds: { $not: this._id } } )
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

Template.addArcDropdown.events({
    'click .addArcButton': function() {
        var episode = Template.parentData(1)._id;
        var arc = this._id;

        //update episode, and arc
        Meteor.call('updateSeasonArc', arc, episode);
        
    }

});


