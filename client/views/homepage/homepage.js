
Template.homepage.helpers({
	recentSeries: function() {
		var i = Series.find({}, {sort: {createdAt: -1}, limit: 3});

		if (i.count() > 0) {
			return i;
		}
	},
	randomSeries: function() {
		var randomnumber = Math.floor(Math.random() * (Series.find().count() - 1));
		return Series.findOne({}, {skip: randomnumber});
	},
	searchResults: function() {
		if (Session.get('searchResult')) {

			return Session.get('searchResult').results.slice(0,5);
		}
	}
});

Template.homepage.events({
	'click #clearSearch': function() {
		Session.set('searchResult', false);
		$('#newSeriesSearch input').val('');
	},
	'submit #newSeriesSearch': function(event) {
		event.preventDefault();
		var query = event.target.searchBox.value;

		url = "https://api.themoviedb.org/3/search/tv?api_key=6d22a3b530e6d0e01197fb9f13b69403&language=en-US&query=" + query + "&page=1";
		$.get(url, function (data) {
			Session.set('searchResult', data);
		});
	},
	'click .addNewSeries': function(event) {
		console.log(event.target.dataset.id);
		var background = "url('http://image.tmdb.org/t/p/original" + event.target.dataset.poster +"')";
		$('#modal-title').text(event.target.dataset.title);
		$("#modal-description").text(event.target.dataset.description);
		$("#modal-image").css("background-image", background);
		$('.actions').show();

		$('.ui.basic.modal')
			.modal('setting', 'transition', 'fade up')
			.modal({
				// blurring: true,
				onApprove : function() {
					Session.set('searchResult', false);
					$('#modal-title').text('Please Wait...');
					$("#modal-description").text('Our worker bees are adding your new series, just give us a moment!');
					$('.actions').hide();

					Meteor.call('gatherSeriesData', event.target.dataset.id);

					setTimeout(function() {
						$('.ui.basic.modal').modal('hide');	
					}, 5000)

					return false;
				}
			})
			.modal('show');
	},
	// 'click .ui.green.ok.inverted.button': function(event) {
	// 	preventDefault();
	// 	// var result = Meteor.call('gatherSeriesData', search);
	// 	Session.set('searchResult', false);
	// 	// console.log(result);

	// 	$('#modal-title').text('Please Wait a Moment...');
	// 	$("#modal-description").text('We are adding your new series!');

	// 	setTimeout(function() {
	// 			$('.ui.basic.modal').modal('hide');	
	// 	}, 5000)

	// }
});
