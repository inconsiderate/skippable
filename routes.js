
Router.configure({
	loadingTemplate: 'loading',
	layoutTemplate: 'layout'
});

Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe('series');
    },
    action: function() {
        this.render('header', {to: 'header'});
        this.render('footer', {to: 'footer'});
        this.render('homepage', {to: 'content'});
    }
});

Router.route('/series/:_slug', {
    waitOn: function() {
        Meteor.subscribe('series');
        Meteor.subscribe('episodes');
        Meteor.subscribe('arcs');
    },
    action: function() {
        this.render('header', {to: 'header'});
        this.render('footer', {to: 'footer'});
        this.render('seriesHomepage', {to: 'content'});
    },
    data: {
        episode_filter: {
            dep: new Tracker.Dependency,
            query: null,
            available: Episodes.find()
        }
    }
});

// Router.route('/series', {
//     waitOn: function () {
//         return Meteor.subscribe('series');
//     },
//     action: function() {
//         this.render('header', {to: 'header'});
//         this.render('footer', {to: 'footer'});
//      	this.render('seriesList', {to: 'content'});
//     }
// });