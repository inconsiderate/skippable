
Series = new orion.collection('series', {
  singularName: orion.helpers.getTranslation('series.singularName'), // The name of one of this items
  pluralName: orion.helpers.getTranslation('series.pluralName'), // The name of more than one of this items
  title: orion.helpers.getTranslation('series.title'), // The title of the page
  link: {
    /**
     * The text that you want to show in the sidebar. The default value is the name of the collection, so in this case is not necesary
     */
    title: orion.helpers.getTranslation('series.title')
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: 'title', title: orion.helpers.getTranslation('series.schema.title') },
      { data: 'startDate', title: orion.helpers.getTranslation('series.schema.startDate') },
      orion.attributeColumn('image', 'poster', orion.helpers.getTranslation('series.schema.poster')),
      { data: 'episodeCount', title: orion.helpers.getTranslation('series.schema.episodeCount') },
      { data: 'slug', title: orion.helpers.getTranslation('series.schema.slug') }
    ]
  }
});

Series.helpers({
  getCreator: function () {
    return Meteor.users.findOne({ _id: this.createdBy });
  }
});

