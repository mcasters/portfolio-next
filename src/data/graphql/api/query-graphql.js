import { request } from 'graphql-request';
import { VIEWER, SIGNIN, SIGNUP, SIGNOUT } from './queries';

const api = '/api/graphql';

export const viewerRequest = () => request(api, VIEWER);
export const signInRequest = (variables) => request(api, SIGNIN, variables);
export const signUpRequest = (variables) => request(api, SIGNUP, variables);
export const signoutRequest = () => request(api, SIGNOUT);
export const contentRequest = (query, variables) =>
  request(api, query, { key: variables });
export const allItemsRequest = (query, variables) =>
  request(api, query, { type: variables });
export const itemsByPartRequest = (query, year, type, part) =>
  request(api, query, {
    year,
    type,
    part,
  });
