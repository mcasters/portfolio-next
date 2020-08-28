import { ApolloServer } from 'apollo-server-micro';
import { graphql } from 'graphql';
import Cors from 'micro-cors';

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
// const cors = Cors();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

export async function queryGraphql(query, variables = {}) {
  const { data } = await graphql({ schema, source: query, variables });
  return data || {};
}

/*export default cors((req, res) =>
  req.method === 'OPTIONS' ? res.end() : handler(req, res),
);*/
