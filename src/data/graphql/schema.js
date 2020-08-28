import { merge } from 'lodash';
import { makeExecutableSchema } from 'apollo-server-micro';

import userResolvers from './resolvers/userResolvers';
import contentResolvers from './resolvers/contentResolvers';
import itemResolvers from './resolvers/itemResolvers';
import typeDefs from './typeDefs';

export const resolvers = merge(userResolvers, contentResolvers, itemResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
