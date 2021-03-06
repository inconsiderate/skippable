Arcs.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    seriesId: orion.attribute('hasOne', {
        label: 'Series'
    }, {
        collection: Series,
        titleField: 'title',
        publicationName: 'arcseries'
    }),
    episodeIds: orion.attribute('hasMany', {
        type: [String],
        label: 'Episodes',
        optional: true
    }, {
        collection: Episodes,
        titleField: 'title',
        publicationName: 'arcepisode'
    }),
    colour: {
        type: String,
        label: 'colour'
    },
    slug: {
        type: String,
        label: 'slug'
    },
    description: {
        type: String,
        label: 'description'
    },
    /**
     * This attribute sets the user id of the user that created this post automatically.
     */
    createdBy: orion.attribute('createdBy'),
    createdAt: orion.attribute('createdAt')
}));
