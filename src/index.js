const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const ServerlessDatabase = require("./datasources/upper");
const resolvers = require("./resolver");
const { ApolloLogPlugin } = require("apollo-log");

const knexConfig = {
  client: "mysql",
  connection: {
    host: "serverlessdb.cpxnahm20ien.us-west-2.rds.amazonaws.com",
    user: "admin",
    password: "zaidimas8",
    database: "sys",
  },
};

const options = {
  didEncounterErrors: true,
  didResolveOperation: false,
  executionDidStart: false,
  parsingDidStart: false,
  responseForOperation: false,
  validationDidStart: false,
  willSendResponse: true,
};
const plugins = [ApolloLogPlugin(options)];

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log("Parsing started!");
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log("Validation started!");
      },
    };
  },
};

const server = new ApolloServer({
  //plugins: [myPlugin],
  typeDefs,
  resolvers,
  dataSources: () => ({
    serverlessDatabase: new ServerlessDatabase(knexConfig),
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(` server ready at ${url}`);
});
