const { gql } = require("apollo-server");
const typeDefs = gql`
  type Upper {
    id: ID!
    name: String
    lowerkey: [Lower]
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
`;

module.exports = typeDefs;
