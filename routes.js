
Router.configure({
	loadingTemplate: 'loading',
	layoutTemplate: 'layout'
});

Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe('series');
    },
    action: function() {
        this.render('seriesHeader', {to: 'header'});
        this.render('homepage', {to: 'content'});
        this.render('footer', {to: 'footer'});
    }
});

Router.route('/series/:_slug/:_slug_2', {
    waitOn: function() {
        Meteor.subscribe('series');
        Meteor.subscribe('episodes');
        Meteor.subscribe('arcs');
    },
    action: function() {
        this.render('seriesHeader', {to: 'header'});
        this.render('seriesHomepage', {to: 'content'});
        this.render('footer', {to: 'footer'});
    },
    data: {
        episode_filter: {
            dep: new Tracker.Dependency,
            query: null
        }
    }
});

Router.route('/series/:_slug', {
    waitOn: function() {
        Meteor.subscribe('series');
        Meteor.subscribe('episodes');
        Meteor.subscribe('arcs');
    },
    action: function() {
        this.render('seriesHeader', {to: 'header'});
        this.render('seriesHomepage', {to: 'content'});
    },
    data: {
        episode_filter: {
            dep: new Tracker.Dependency,
            query: null
        }
    }
});

Router.route('/series', {
    waitOn: function () {
        return Meteor.subscribe('series');
    },
    action: function() {
        this.render('seriesHeader', {to: 'header'});
     	this.render('seriesList', {to: 'content'});
        this.render('footer', {to: 'footer'});
    }
});