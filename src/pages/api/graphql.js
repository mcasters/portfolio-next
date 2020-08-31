import { ApolloServer } from 'apollo-server-micro';
import { graphql } from 'graphql';

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

export async function queryGraphql(query, variableValues = {}) {
  const { data } = await graphql({schema, source: query, variableValues});
  // const data = res.json();
  // console.log('//// res into query : ' + data);
  return data || {};
}
