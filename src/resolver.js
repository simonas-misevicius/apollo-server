module.exports = {
  Query: {
    uppers: (_, {}, { dataSources }) =>
      dataSources.serverlessDatabase.getUppers(),
    upper: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getUpperById(id),
    lower: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getLowerById(id),
  },

  Mutation: {
    addUpper: (_, { name }, { dataSources }) =>
      dataSources.serverlessDatabase.addUpper(name),
    removeUpper: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.removeUpper(id),
    editUpper: (_, { name }, { dataSources }) =>
      dataSources.serverlessDatabase.editUpper(name),
  },
};
