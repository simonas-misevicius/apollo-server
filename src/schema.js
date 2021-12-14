const { gql } = require("apollo-server");
const typeDefs = gql`
  type Upper {
    id: ID!
    name: String
    lowers: [Lower]
  }
  type Lower {
    id: ID
    namel: String
    upperkey: String
  }
  type Query {
    uppers: [Upper]
    upper(id: ID!): Upper
    lowers: [Lower]!
    lower(id: ID!): Lower
  }
  type Mutation {
    addUpper(name: String!): MutationResponse!
    removeUpper(id: ID!): MutationResponse!
    editUpper(name: String!, id: ID!): MutationResponse!
    addLower(name: String!, keyId: ID!): MutationResponse!
    removeLower(id: ID!): MutationResponse!
    editLower(name: String!, keyId: ID!, id: ID!): MutationResponse!
  }
  type MutationResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = typeDefs;
