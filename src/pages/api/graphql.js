import { createServer } from '@graphql-yoga/node'

import { schema } from '../../data/graphql/schema';

export default createServer({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})

export const config = {
  api: {
    bodyParser: false,
  },
}