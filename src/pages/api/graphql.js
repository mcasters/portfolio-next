import { createYoga, createSchema } from 'graphql-yoga';

import { resolvers } from '../../data/graphql/schema';
import typeDefs from '../../data/graphql/typeDefs';

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema({
    typeDefs,
    resolvers,
    // context: ({req, res}) => ({req, res}),
  }),
});
