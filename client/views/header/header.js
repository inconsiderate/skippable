
Template.header.events({
  	'click #navigation-home': function () {
    	Router.go('/');
  	},
  	'click #navigation-series': function () {
    	Router.go('/series');
  	}
});

Template.header.onRendered(function() {
	// $('.tooltip-popup').popup();
});

Template.seriesHeader.helpers({
    currentSeries: function() {
        return Series.findOne({slug: Router.current().params._slug});
    },

    seriesArcs: function() {
        return Arcs.find({seriesId: this._id});
    }
});


Template.seriesHeader.onRendered(function(){

});

Template.seriesHeader.events({

    'click .sidebar-button': function(event) {
        var parent = Template.parentData(2);
        if (parent != null) {

            parent.episode_filter.dep.depend();
            var id = $(event.target).attr('id');
            var query = parent.episode_filter.query;



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

        $(event.target).toggleClass('inverted');
        $('.ui.sidebar').toggleClass('move');
    },

    'click .ui.inverted.mobile.header': function(event) {
        $('.ui.sidebar').toggleClass('move');
    }
});
