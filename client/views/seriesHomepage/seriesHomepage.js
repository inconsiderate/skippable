
Template.seriesHomepage.helpers({
    currentSeries: function() {
        return Series.findOne({slug: Router.current().params._slug});
    },

    filteredEpisodes: function() {
        var parent = Template.parentData(1);

        parent.episode_filter.dep.depend();
        var query = parent.episode_filter.query;
        if (query == null) {
            return Episodes.find({seriesId: this._id}, {sort: {season: 1, number: 1}});
        } else {
            return Episodes.find(query, {sort: {season: 1, number: 1}});
        }
    },

    episodes: function() {
        return Episodes.find({seriesId: this._id});
    },

    seriesArcs: function() {
        var arcs = Arcs.find({seriesId: this._id});

        if (arcs.count() > 0) {
            return arcs;
        } else {
            return false;
        }
    },

    "startDateFormatted": function(){
		if (this.startDate) {
			var m = moment(this.startDate).utc();
			return moment(m).format("YYYY");
		} else {
			return false;
		}
	}
});

Template.seriesHomepage.events({
    'click #newTagSubmit': function(event) {
        var arc = $('#newTagInputTitle').val();
        var colour = $('#newTagInputColour').val();
        var description = $('#newTagInputDescription').val();
        var series = this._id;

        Meteor.call('addArcToSeason', arc, series, colour, description);

        $('#newTagInputTitle').val('');
    },

    'click .delete-series': function(event) {
        Meteor.call('deleteSeries', this._id);
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
        var arcs = Arcs.find({episodeIds: this._id});
        if (arcs.count() > 0) {
            return arcs;
        } else {
            return false;
        }
    },

    episodeArcChoices: function() {
        var parent = Template.parentData(1);

        var arcs =  Arcs.find( {
            seriesId: parent._id,
            episodeIds: { $not: this._id }
        } );

        if (arcs.count() > 0) {
            return arcs;
        } else {
            return false;
        }
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

Template.singleEpisode.events({
    'click .episode-container': function(event) {
        if ($("#episode-comments-toggle").prop('checked')) {
            $('#disqus_thread').remove();
            $('#' + this._id).append("<div id='disqus_thread'></div>");

            var slug = this.slug;
            var id = this.id;
            var disqus_config = function () {
                this.page.url = 'http://skippable.herokuapp.com/series/' + Template.parentData(1).slug + '/' + slug;
                this.page.identifier = slug;
            };
            (function() {
                if (window.DISQUS) {
                    DISQUS.reset({
                        reload: true,
                        config: function () {
                            this.page.url = 'http://skippable.herokuapp.com/series/' + Template.parentData(1).slug + '/' + slug;
                            this.page.identifier = slug;
                        }
                    });
                } else {
                    var d = document, s = d.createElement('script');
                    s.src = '//skippable.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                }
            })();
        }
    },
    'click .remove.icon': function(event) {
        // stop accordion from firing
        event.stopPropagation();

        var episode = Template.parentData(0)._id;
        var arc = this._id;

        //update episode, and arc
        Meteor.call('removeArcFromEpisode', arc, episode);
    }

});

Template.seriesHomepage.onRendered(function() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.ui.inverted.grid.segment.fixed').addClass('black')
        }
        if ($(this).scrollTop() < 50) {
            $('.ui.inverted.grid.segment.fixed').removeClass('black')
        }
    });
});

Template.singleEpisode.onRendered(function() {
    $('.ui.accordion').accordion();

    $('.ui.sticky').sticky({
        context: '#episode-list',
        offset: 80,
    });
});

Template.addArcDropdown.events({
    'click .addArcButton': function() {
        var episode = Template.parentData(1)._id;
        var arc = this._id;

        //update episode, and arc
        Meteor.call('updateSeasonArc', arc, episode);
    }

});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('isAdmin', function () {
    var user = Meteor.user();
    
    return user.hasRole('admin');
});
