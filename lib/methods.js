
Meteor.methods({
    gatherSeriesData: function(id) {
        if (Roles.userHasRole(Meteor.user(), 'admin')) {
            console.log('user has admin');
        }

        Meteor.call('getSeriesById', id, function(err, res) {
            if (!err) {
                return res;
            }
                return err;
        })
    },

    nightlySeriesUpdate: function() {
        Series.find().forEach(function(series) {
            var url = 'https://api.themoviedb.org/3/tv/' + series.themoviedb + '?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403';
            var tmdbData = Meteor.http.get(url);

            Meteor.call('updateSeriesData', tmdbData.data, series, function (err, res) {});
        })
    },

    updateSeriesData: function(tmdbData, series) {
        this.unblock();
        if (tmdbData.status == 'Returning Series') {
            for (var i=0 ;i< tmdbData.number_of_seasons; i++) {
                (function(ind) {
                    var current = ind + 1;
                    Meteor.setTimeout(function(){
                        var params = {
                            url: 'https://api.themoviedb.org/3/tv/' + series.themoviedb + '/season/' + current + '?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403',
                            seriesId: series._id
                        };
                        Meteor.call('addSeasonEpisodes', params, function (err, res) {});
                    }, 1000 + (3000 * ind));
                })(i);
            }

            return true;
        } else {
            Series.update(series, {
                status: tmbdData.data.status
            });
        }
    },

    getSeriesById: function(id) {
        this.unblock();
        var url = 'https://api.themoviedb.org/3/tv/' + id + '?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403';
        var series = Meteor.http.get(url);
        // convert all non-words to dashes, trim trailing dash, and lowercase
        var slug = series.data.name.replace(/\W+/g, '-').replace(/\-$/, '').toLowerCase();

        if (!Series.findOne({themoviedb: series.data.id})) {
            var poster = 'http://image.tmdb.org/t/p/original' + series.data.poster_path;
            var backdrop = 'http://image.tmdb.org/t/p/original' + series.data.backdrop_path;
            var newSeries = Series.insert({
                title: series.data.name,
                description: series.data.overview,
                slug: slug,
                themoviedb: series.data.id,
                startDate: series.data.first_air_date,
                studio: series.data.networks.name,
                status: series.data.status,
                remotePoster: poster,
                remoteBackdrop: backdrop
            });

            var seriesCursor = Series.findOne({_id: newSeries});
            for (var i=0 ;i< series.data.number_of_seasons; i++) {
                (function(ind) {
                    var current = ind + 1;
                    Meteor.setTimeout(function(){
                        var params = {
                            url: 'https://api.themoviedb.org/3/tv/' + seriesCursor.themoviedb + '/season/' + current + '?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403',
                            seriesId: newSeries
                        };
console.log('adding season ' + current);
                        Meteor.call('addSeasonEpisodes', params, function (err, res) {
                        });

                    }, 1000 + (3000 * ind));
                })(i);
            }

            return true;
        } else {

            return false;
        }


    },

    addSeasonEpisodes: function(params) {
        var season = Meteor.http.get(params.url);
        var existingEpisodes = Episodes.find({seriesId: params.seriesId, season: season.data.season_number});
        var count = existingEpisodes.count();
        for (i = 0; i < season.data.episodes.length; i++) {
            var currentEpisode = season.data.episodes[i];
            // convert all non-words to dashes, trim trailing dash, and lowercase
            var slug = currentEpisode.name.replace(/\W+/g, '-').replace(/\-$/, '').toLowerCase();
                if (!count || !Episodes.findOne({seriesId: params.seriesId, slug: slug})) {
                    var newEpisode = Episodes.insert({
                        title: currentEpisode.name,
                        number: currentEpisode.episode_number,
                        season: season.data.season_number,
                        seriesId: params.seriesId,
                        themoviedb: currentEpisode.id,
                        description: currentEpisode.overview,
                        slug: slug,
                        airDate: currentEpisode.air_date
                    });

                    Series.update(params.seriesId, {
                        $push: {
                            episodeIds: newEpisode
                        }
                    });
                }
        }
    },

    addArcToSeason: function(arc, series, colour, desc) {
        // convert all non-words to dashes, trim trailing dash, and lowercase
        var slug = arc.replace(/\W+/g, '-').replace(/\-$/, '').toLowerCase();

        var newTag = Arcs.insert({
            title: arc,
            seriesId: series,
            slug: slug,
            colour: colour,
            description: desc
        });
    },

    updateSeasonArc: function(arc, episode) {
        Arcs.update(arc, {
            $push: {
                episodeIds: episode
            }
        });

        Episodes.update(episode, {
            $push: {
                arcIds: arc
            }
        });
    },

    removeArcFromEpisode: function(arc, episode) {

        Arcs.update(arc, {
            $pull: {
                episodeIds: episode
            }
        });

        Episodes.update(episode, {
            $pull: {
                arcIds: arc
            }
        });
    },

    isAdmin: function() {
        
    }
    
});
