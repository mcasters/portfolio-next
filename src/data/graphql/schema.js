import { merge } from 'lodash';
import userResolvers from './resolvers/userResolvers';
import contentResolvers from './resolvers/contentResolvers';
import itemResolvers from './resolvers/itemResolvers';

export const resolvers = merge(userResolvers, contentResolvers, itemResolvers);
