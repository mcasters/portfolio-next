import { merge } from 'lodash';
import { makeExecutableSchema } from '@graphql-tools/schema';

import userResolvers from './resolvers/userResolvers';
import contentResolvers from './resolvers/contentResolvers';
import itemResolvers from './resolvers/itemResolvers';
import fileResolvers from "./resolvers/fileResolvers";
import typeDefs from './typeDefs';

export const resolvers = merge(userResolvers, contentResolvers, itemResolvers, fileResolvers);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
