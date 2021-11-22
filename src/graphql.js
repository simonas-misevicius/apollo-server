const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("./schema");
const ServerlessDatabase = require("./datasources/upper");
const resolvers = require("./resolver");
const knexConfig = {
  client: "mysql",
  connection: {
    host: "serverlessdb.cpxnahm20ien.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "zaidimas8",
    database: "sys",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    serverlessDatabase: new ServerlessDatabase(knexConfig),
  }),
  playground: {
    endpoint: "/dev/graphql",
  },
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: false,
  },
});
