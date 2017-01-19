Episodes.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    seriesId: orion.attribute('hasOne', {
        label: 'Series'
    }, {
        collection: Series,
        titleField: 'title',
        publicationName: 'episodeseries'
    }),
    arcIds: orion.attribute('hasMany', {
        type: [String],
        label: 'Arcs for this Episode',
        optional: true
    }, {
        collection: Arcs,
        titleField: 'title',
        publicationName: 'episodearc'
    }),

    slug: {
        type: String,
        label: 'Slug'
    },
    season: {
        type: Number,
        label: 'Season'
    },
    number: {
        type: Number,
        label: 'Number'
    },
    airDate: {
        type: Date,
        label: "Air Date",
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        },
        optional: true
    },
    description: orion.attribute('froala', {
        label: orion.helpers.getTranslation('episodes.schema.description'), // We use this function to make i18n work in autoform
        optional: true
    }),
    poster: orion.attribute('image', {
        label: 'Poster Image',
        optional: true
    }),
    /**
     * This attribute sets the user id of the user that created this post automatically.
     */
    createdBy: orion.attribute('createdBy'),
    createdAt: orion.attribute('createdAt')
}));
