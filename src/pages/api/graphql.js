import { ApolloServer } from 'apollo-server-micro';

import { schema } from '../../data/graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});
const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
