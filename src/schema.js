const { gql } = require("apollo-server");
const typeDefs = gql`
  type Upper {
    id: ID!
    name: String
    lowerkey: String
    lowers: [Lower]
  }
  type Lower {
    id: ID!
    namel: String
  }
  type Query {
    uppers: [Upper]!
    upper(id: ID!): Upper
    lowers: [Lower]!
    lower(id: ID!): Lower
  }
  type Mutation {
    addUpper(name: String!): UpperUpdateResponse!
    removeUpper(id: ID!): UpperUpdateResponse!
    editUpper(name: String!): UpperUpdateResponse!
  }
  type UpperUpdateResponse {
    success: Boolean!
  }
`;

module.exports = typeDefs;
