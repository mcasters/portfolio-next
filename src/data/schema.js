import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './graphql/type-defs';
import userResolvers from './graphql/resolvers/userResolvers';
import contentResolvers from './graphql/resolvers/contentResolvers';
import itemResolvers from './graphql/resolvers/itemResolvers';
import uploadResolvers from './graphql/resolvers/uploadResolvers';

const resolvers = merge(
  userResolvers,
  contentResolvers,
  itemResolvers,
  uploadResolvers,
);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
