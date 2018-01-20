
Arcs = new orion.collection('arcs', {
    singularName: orion.helpers.getTranslation('arcs.singularName'), // The name of one of this items
    pluralName: orion.helpers.getTranslation('arcs.pluralName'), // The name of more than one of this items
    title: orion.helpers.getTranslation('arcs.title'), // The title of the page
    link: {
        /**
         * The text that you want to show in the sidebar. The default value is the name of the collection, so in this case is not necesary
         */
        title: orion.helpers.getTranslation('arcs.title')
    },
    /**
     * Tabular settings for this collection
     */
    tabular: {
        columns: [
            { data: 'title', title: orion.helpers.getTranslation('arcs.schema.title') },
            { data: 'seriesId', title: orion.helpers.getTranslation('arcs.schema.series') },
            { data: 'colour', title: orion.helpers.getTranslation('arcs.schema.colour') },
            { data: 'slug', title: orion.helpers.getTranslation('arcs.schema.slug') }
        ]
    }
});

Arcs.helpers({
    getCreator: function () {
        return Meteor.users.findOne({ _id: this.createdBy });
    }
});

