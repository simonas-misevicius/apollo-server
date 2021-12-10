module.exports = {
  Query: {
    uppers: (_, {}, { dataSources }) =>
      dataSources.serverlessDatabase.getUppers(),
    upper: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getUpperById(id),
    lower: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.getLowerById(id),
    lowers: (_, {}, { dataSources }) =>
      dataSources.serverlessDatabase.getLowers(),
  },

  Mutation: {
    addUpper: (_, { name }, { dataSources }) =>
      dataSources.serverlessDatabase.addUpper(name),
    removeUpper: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.removeUpper(id),
    editUpper: (_, { name, id }, { dataSources }) =>
      dataSources.serverlessDatabase.editUpper(name, id),
    addLower: (_, { name, keyId }, { dataSources }) =>
      dataSources.serverlessDatabase.addLower(name, keyId),
    removeLower: (_, { id }, { dataSources }) =>
      dataSources.serverlessDatabase.removeLower(id),
    editLower: (_, { name, keyId, id }, { dataSources }) =>
      dataSources.serverlessDatabase.editLower(name, keyId, id),
  },
};
