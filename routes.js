
Router.configure({
	loadingTemplate: 'loading',
	layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
    $('body').removeClass();
    $('body').addClass(this.route.getName());
    this.next();
});

Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe('series');
    },
    action: function() {
        this.render('seriesHeader', {to: 'header'});
        this.render('homepage', {to: 'content'});
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
    }
});

Router.route('/about', {
    action: function() {
        this.render('seriesHeader', {to: 'header'});
        this.render('about', {to: 'content'});
    }
});