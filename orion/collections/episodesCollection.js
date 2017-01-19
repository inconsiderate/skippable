
Episodes = new orion.collection('episodes', {
    singularName: orion.helpers.getTranslation('episodes.singularName'), // The name of one of this items
    pluralName: orion.helpers.getTranslation('episodes.pluralName'), // The name of more than one of this items
    title: orion.helpers.getTranslation('episodes.title'), // The title of the page
    link: {
        /**
         * The text that you want to show in the sidebar. The default value is the name of the collection, so in this case is not necesary
         */
        title: orion.helpers.getTranslation('episodes.title')
    },
    /**
     * Tabular settings for this collection
     */
    tabular: {
        columns: [
            { data: 'title', title: orion.helpers.getTranslation('episodes.schema.title') },
            orion.attributeColumn('image', 'poster', orion.helpers.getTranslation('episodes.schema.poster')),
            { data: 'season', title: orion.helpers.getTranslation('episodes.schema.season') },
            { data: 'number', title: orion.helpers.getTranslation('episodes.schema.number') },
            { data: 'airDate', title: orion.helpers.getTranslation('episodes.schema.airDate') },
            { data: 'slug', title: orion.helpers.getTranslation('episodes.schema.slug') },
            { data: 'description', title: orion.helpers.getTranslation('episodes.schema.description') }
        ]
    }
});

Episodes.helpers({
    getCreator: function () {
        return Meteor.users.findOne({ _id: this.createdBy });
    }
});

