
if (Meteor.isServer) {
    if (Series.find().count() < 4) {
        Series.remove({});
        Episodes.remove({});
        Arcs.remove({});

        var buffy = Series.insert({
            title: 'Buffy the Vampire Slayer',
            description: "In every generation there is a Chosen One. She alone will stand against the vampires, the demons and the forces of darkness. She is the Slayer. Sarah Michelle Gellar stars as Buffy Summers, The Chosen One, the one girl in all the world with the strength and skill to fight the vampires. With the help of her close friends, Willow (Alyson Hannigan), Xander (Nicholas Brendon), and her Watcher Giles (Anthony Stewart Head) she balances slaying, family, friendships, and relationships.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'buffy-the-vampire-slayer',
            themoviedb: 95,
            episodeIds: [],
            arcIds: [],
            studio: 'Fox',
            remotePoster: 'https://image.tmdb.org/t/p/w440_and_h660_bestv2/uzr2KkwC67BNpFj1RKQObWBfh9m.jpg',
            remoteBackdrop: 'https://image.tmdb.org/t/p/original/tkyWzwwYptHDAXZfFk1patcl79N.jpg'
        });

        var battlestar = Series.insert({
            title: 'Battlestar Galactica',
            description: "In a distant part of the universe, a civilization of humans live on planets known as the Twelve Colonies. In the past, the Colonies have been at war with a cybernetic race known as the Cylons. 40 years after the first war the Cylons launch a devastating attack on the Colonies. The only military ship that survived the attack takes up the task of leading a small fugitive fleet of survivors into space in search of a fabled refuge known as Earth.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'battlestar-galactia',
            themoviedb: 1972,
            arcIds: [],
            episodeIds: [],
        });

        var supernatural = Series.insert({
            title: 'Supernatural',
            description: "Two brothers follow their father's footsteps as 'hunters' fighting evil supernatural beings of many kinds including monsters, demons, and gods that roam the earth.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'supernatural',
            themoviedb: 1622,
            arcIds: [],
            episodeIds: [],
        });

        var buffy01 = Episodes.insert({
            title: 'Welcome to the Hellmouth (1)',
            season: 1,
            number: 1,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-first-episode',
            arcIds: []
        });

        var buffy02 = Episodes.insert({
            title: 'The Harvest (2)',
            season: 1,
            number: 2,
            seriesId: buffy,
            description: 'This is the second episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-second-episode',
            arcIds: []
        });
        var buffy03 = Episodes.insert({
            title: 'Witch',
            season: 1,
            number: 3,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-third-episode',
            arcIds: []
        });
        var buffy04 = Episodes.insert({
            title: "Teacher's Pet",
            season: 1,
            number: 4,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-fourth-episode',
            arcIds: []
        });

        var buffy05 = Episodes.insert({
            title: 'Never Kill a Boy on the First Date',
            season: 1,
            number: 5,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-fifth-episode',
            arcIds: []
        });

        var buffy06 = Episodes.insert({
            title: 'The Pack',
            season: 1,
            number: 6,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-sixth-episode',
            arcIds: []
        });

        var buffy07 = Episodes.insert({
            title: 'Angel',
            season: 1,
            number: 7,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-seventh-episode',
            arcIds: []
        });

        var buffy08 = Episodes.insert({
            title: 'I, Robot... You, Jane',
            season: 1,
            number: 8,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-eight-episode',
            arcIds: []
        });

        var buffy09 = Episodes.insert({
            title: 'The Puppet Show',
            season: 1,
            number: 9,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-nine-episode',
            arcIds: []
        });

        var buffy10 = Episodes.insert({
            title: 'Nightmares',
            season: 1,
            number: 10,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-ten-episode',
            arcIds: []
        });

        var buffy11 = Episodes.insert({
            title: 'Out of Mind, Out of Sight',
            season: 1,
            number: 11,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-11-episode',
            arcIds: []
        });

        var buffy12 = Episodes.insert({
            title: 'Prophecy Girl',
            season: 1,
            number: 12,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-12-episode',
            arcIds: []
        });
        var buffySeasonPlot = Arcs.insert({
            title: 'Season Main Plot',
            seriesId: buffy,
            colour: 'red',
            slug: 'main-plot',
            description: 'main-plot',
            episodeIds: [buffy01, buffy02]
        });
        var buffyWillow = Arcs.insert({
            title: 'Willow',
            seriesId: buffy,
            colour: 'blue',
            slug: 'willow',
            description: 'willow plot',
            episodeIds: [buffy02]
        });
        var buffyAnya = Arcs.insert({
            title: 'Anya',
            seriesId: buffy,
            colour: 'pink',
            slug: 'anya',
            description: 'anya plot',
            episodeIds: [buffy02, buffy01]
        });

        var buffyEpisodes = [ buffy01, buffy02 ];
        var buffyArcs = [buffySeasonPlot, buffyWillow, buffyAnya ];

        Series.update(buffy, {
            $push: {
                arcIds: {$each: buffyArcs},
                episodeIds: {$each: buffyEpisodes}
            }
        });

        Episodes.update(buffy01, {
            $push: {
                arcIds: {$each: [buffySeasonPlot, buffyAnya]}
            }
        });

        Episodes.update(buffy02, {
            $push: {
                arcIds: {$each: buffyArcs}
            }
        });

        // Meteor.users.update(mike, {
        //     $push: {
        //         "profile.series": {$each: [buffy, battlestar]}
        //     }
        // });
    }
}