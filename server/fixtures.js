
if (Meteor.isServer) {
    if (Series.find().count() < 3) {
        Series.remove({});

        var mike = Accounts.createUser({
            email: 'mike@gmail.com',
            createdAt: new Date(),
            password: 'password',
            profile: {
                username: 'mike',
                series: [],
                bio: "After climbing mountains and catching international terrorists, I like to relax in the evenings with a cold glass of milk."
            }
        });

        var buffy = Series.insert({
            title: 'Buffy the Vampire Slayer',
            description: "In every generation there is a Chosen One. She alone will stand against the vampires, the demons and the forces of darkness. She is the Slayer. Sarah Michelle Gellar stars as Buffy Summers, The Chosen One, the one girl in all the world with the strength and skill to fight the vampires. With the help of her close friends, Willow (Alyson Hannigan), Xander (Nicholas Brendon), and her Watcher Giles (Anthony Stewart Head) she balances slaying, family, friendships, and relationships.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'buffy-the-vampire-slayer',
            episodeIds: [],
            arcIds: []
        });

        var battlestar = Series.insert({
            title: 'Battlestar Galactica',
            description: "In a distant part of the universe, a civilization of humans live on planets known as the Twelve Colonies. In the past, the Colonies have been at war with a cybernetic race known as the Cylons. 40 years after the first war the Cylons launch a devastating attack on the Colonies. The only military ship that survived the attack takes up the task of leading a small fugitive fleet of survivors into space in search of a fabled refuge known as Earth.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'battlestar-galactia',
            arcs: []
        });

        var supernatural = Series.insert({
            title: 'Supernatural',
            description: "Two brothers follow their father's footsteps as 'hunters' fighting evil supernatural beings of many kinds including monsters, demons, and gods that roam the earth.",
            startDate: new Date(),
            createdAt: new Date(),
            slug: 'supernatural',
            arcs: []
        });

        var buffys01e01 = Episodes.insert({
            title: 'The First Episode',
            season: 1,
            number: 1,
            seriesId: buffy,
            description: 'This is the first episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-first-episode',
            arcIds: []
        });

        var buffys01e02 = Episodes.insert({
            title: 'The Second Episode',
            season: 1,
            number: 2,
            seriesId: buffy,
            description: 'This is the second episode.',
            airDate: new Date(),
            lastUpdate: new Date(),
            slug: 'the-second-episode',
            arcIds: []
        });

        var buffySeasonPlot = Arcs.insert({
            title: 'Season Main Plot',
            seriesId: buffy,
            colour: 'red',
            episodeIds: [buffys01e01, buffys01e02]
        });
        var buffyWillow = Arcs.insert({
            title: 'Willow',
            seriesId: buffy,
            colour: 'blue',
            episodeIds: [buffys01e01, buffys01e02]
        });
        var buffyAnya = Arcs.insert({
            title: 'Anya',
            seriesId: buffy,
            colour: 'pink',
            episodeIds: [buffys01e02]
        });

        var buffyEpisodes = [ buffys01e01, buffys01e02 ];
        var buffyArcs = [buffySeasonPlot, buffyWillow, buffyAnya ];

        Series.update(buffy, {
            $push: {
                arcIds: {$each: buffyArcs},
                episodeIds: {$each: buffyEpisodes}
            }
        });

        Episodes.update(buffys01e01, {
            $push: {
                arcIds: {$each: buffyArcs}
            }
        });

        Episodes.update(buffys01e02, {
            $push: {
                arcIds: {$each: buffyArcs}
            }
        });

        Meteor.users.update(mike, {
            $push: {
                "profile.series": {$each: [buffy, battlestar]}
            }
        });
    }
}