import { ApolloServer } from 'apollo-server-micro';

import { resolvers } from '../../data/graphql/schema';
import typeDefs from '../../data/graphql/typeDefs'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};