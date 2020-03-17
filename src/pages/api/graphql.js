import { ApolloServer } from 'apollo-server-micro';
import { resolvers } from '../../data/graphql/schema';
import { typeDefs } from '../../data/graphql/typeDefs';

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
