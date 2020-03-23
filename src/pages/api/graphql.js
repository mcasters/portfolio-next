import { ApolloServer } from 'apollo-server-micro';
import { resolvers } from '../../data/graphql/schema';
import { typeDefs } from '../../data/graphql/typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 1000000, // 1 MB
    maxFiles: 20,
    playground: true,
    introspection: true,
  },
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
