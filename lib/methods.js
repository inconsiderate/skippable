
Meteor.methods({

    gatherSeriesData: function(id) {
        if (Roles.userHasRole(Meteor.user(), 'admin')) {
        }

        Meteor.call('getSeriesById', id, function(err, res) {
            if (!err) {
                return res;
            }
                return err;
        })
    },

    nightlySeriesUpdate: function() {
        if (Meteor.isServer) {
            Series.find().forEach(function(series) {
                var url = 'https://api.themoviedb.org/3/tv/' + series.themoviedb + '?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403';
                var tmdbData = Meteor.http.get(url);
                Meteor.call('updateSeriesData', tmdbData.data, series, function (err, res) {});
            })
        }
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

        this.unblock();
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

// https://api.themoviedb.org/3/tv/95?language=en-US&api_key=6d22a3b530e6d0e01197fb9f13b69403
// {"backdrop_path":"/jEcm87wgNvWHPodiZNk5Bf3KdV4.jpg","created_by":[{"id":12891,"name":"Joss Whedon","profile_path":"/dTiVsuaTVTeGmvkhcyJvKp2A5kr.jpg"}],"episode_run_time":[43,42,45,60],"first_air_date":"1997-03-10","genres":[{"id":28,"name":"Action"},{"id":35,"name":"Comedy"},{"id":18,"name":"Drama"},{"id":14,"name":"Fantasy"}],"homepage":"http://www.foxhome.com/buffysplash/","id":95,"in_production":false,"languages":["en"],"last_air_date":"2003-05-20","name":"Buffy the Vampire Slayer","networks":[{"id":21,"name":"The WB Television Network"},{"id":40,"name":"UPN"}],"number_of_episodes":144,"number_of_seasons":7,"origin_country":["US"],"original_language":"en","original_name":"Buffy the Vampire Slayer","overview":"Buffy the Vampire Slayer is an American television series which aired from March 10, 1997 until May 20, 2003. The series was created in 1997 by writer-director Joss Whedon under his production tag, Mutant Enemy Productions with later co-executive producers being Jane Espenson, David Fury, David Greenwalt, Doug Petrie, Marti Noxon, and David Solomon. The series narrative follows Buffy Summers, the latest in a line of young women known as \"Vampire Slayers\" or simply \"Slayers\". In the story, Slayers are \"called\" to battle against vampires, demons, and other forces of darkness. Like previous Slayers, Buffy is aided by a Watcher, who guides, teaches, and trains her. Unlike her predecessors, Buffy surrounds herself with a circle of loyal friends who become known as the \"Scooby Gang\".","popularity":5.483535,"poster_path":"/o5CdzIeF1tZ2OMsDEfR5iAnRjvd.jpg","production_companies":[{"name":"20th Century Fox Television","id":1556},{"name":"Kuzui Enterprises","id":2516},{"name":"Sandollar Productions","id":5842},{"name":"Mutant Enemy Productions","id":10567}],"seasons":[{"air_date":null,"episode_count":1,"id":59472,"poster_path":"/oy1Xd3JrjN8Tt9QHYzTDpjU3CNn.jpg","season_number":0},{"air_date":"1997-03-10","episode_count":12,"id":59465,"poster_path":"/74TzGkPsdPqGa632PqyxYxgApia.jpg","season_number":1},{"air_date":"1997-09-15","episode_count":22,"id":59466,"poster_path":"/2SE6XEqZ5Zyj4mhRGg2n9UaeGnY.jpg","season_number":2},{"air_date":"1998-09-29","episode_count":22,"id":59467,"poster_path":"/mN5dBK732b2Bk3oxF8IQgDet1Os.jpg","season_number":3},{"air_date":"1999-10-05","episode_count":22,"id":59468,"poster_path":"/7SvnFjwlsqDsT3bX0ItTjpuzIks.jpg","season_number":4},{"air_date":"2000-09-26","episode_count":22,"id":59469,"poster_path":"/w31ArgvaylbIW0exXXgbdCq2scm.jpg","season_number":5},{"air_date":"2001-10-02","episode_count":22,"id":59470,"poster_path":"/j6PIKJQ3AFB30QlDR9ROfc3kCsp.jpg","season_number":6},{"air_date":"2002-09-24","episode_count":22,"id":59471,"poster_path":"/dZtifDwkoaTBilD4BMtt1FAIrXK.jpg","season_number":7}],"status":"Ended","type":"Scripted","vote_average":7.8,"vote_count":89}

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
        
    },

    deleteSeries: function(series) {
        Arcs.remove({seriesId: series});
        Episodes.remove({seriesId: series});
        Series.remove({_id: series});
    }
    
});
