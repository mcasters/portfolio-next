import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';

import { resolvers } from '../../data/graphql/schema';
import { typeDefs } from '../../data/graphql/typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

const apolloHandler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};
// export default apolloHandler;

const cors = Cors();

export default cors(apolloHandler);
