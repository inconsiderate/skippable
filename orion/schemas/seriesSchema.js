Series.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title'
    },
    episodeIds: orion.attribute('hasMany', {
        type: [String],
        label: 'Episodes for this Series',
        optional: true
    }, {
        collection: Episodes,
        titleField: 'title',
        publicationName: 'seriesepisode'
    }),
    themoviedb: {
        type: Number,
        label: "movieDB ID"
    },
    arcIds: orion.attribute('hasMany', {
        type: [String],
        label: 'Arcs for this Series',
        optional: true
    }, {
        collection: Arcs,
        titleField: 'title',
        publicationName: 'seriesarc'
    }),
    slug: {
        type: String,
        label: 'Slug'
    },
    studio: {
        type: String,
        label: 'Studio',
        optional: true
    },
    startDate: {
        type: Date,
        label: "Start Date",
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        },
        optional: true
    },
    endDate: {
        type: Date,
        label: "End Date",
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        },
        optional: true
    },
    description: {
        type: String,
        label: 'Description',
        optional: true
    },
    // description: orion.attribute('summernote', {
    //     label: orion.helpers.getTranslation('series.schema.description'), // We use this function to make i18n work in autoform
    //     optional: true
    // }),
    /**
     * WARNING: the url of the image will not be saved in .image, it will be saved in .image.url.
     */
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
