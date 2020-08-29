import { request } from 'graphql-request';
import { VIEWER, SIGNIN, SIGNUP, SIGNOUT } from './queries';

const api = '/api/graphql';

export const viewerRequest = () => request(api, VIEWER);
export const signInRequest = (username, password) =>
  request(api, SIGNIN, { signInInput: { username, password } });
export const signUpRequest = (username, email, password) =>
  request(api, SIGNUP, { signUpInput: { username, email, password } });
export const signoutRequest = () => request(api, SIGNOUT);
export const contentRequest = (query, variables) =>
  request(api, query, { key: variables });
export const allItemsRequest = (query, type) =>
  request(api, query, { type: type });
export const itemsByPartRequest = (query, year, type, part) =>
  request(api, query, {
    year,
    type,
    part,
  });
export const addItemRequest = (item) => request(api, SIGNUP, item);
