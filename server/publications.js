
Meteor.publish('series', function () {
	return Series.find({});
});

Meteor.publish('episodes', function () {
    return Episodes.find({});
});

Meteor.publish('arcs', function () {
    return Arcs.find({});
});

