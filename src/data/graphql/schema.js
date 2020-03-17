import { merge } from 'lodash';
import userResolvers from './resolvers/userResolvers';
import contentResolvers from './resolvers/contentResolvers';
import itemResolvers from './resolvers/itemResolvers';
import uploadResolvers from './resolvers/uploadResolvers';

export const resolvers = merge(
  userResolvers,
  contentResolvers,
  itemResolvers,
  uploadResolvers,
);
