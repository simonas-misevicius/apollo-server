module.exports = {
  Query: {
    uppers: (_, {}, { dataSources }) =>
      dataSources.serverlessDatabase.getUppers(),
    upper: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getUpperById(id),
    lower: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getLowerById(id),
  },
};
