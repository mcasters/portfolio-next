import { request } from 'graphql-request';
import { VIEWER, SIGNIN, SIGNUP, SIGNOUT, ADD_ITEM } from './queries';

const api = '/api/graphql';

export const viewerRequest = () => request(api, VIEWER);
export const signInRequest = (username, password) =>
  request(api, SIGNIN, { signInInput: { username, password } });
export const signUpRequest = (username, email, password) =>
  request(api, SIGNUP, { signUpInput: { username, email, password } });
export const signoutRequest = () => request(api, SIGNOUT);
export const contentRequest = (query, key) => request(api, query, { key });
export const allItemsRequest = (query, type) => request(api, query, { type });
export const itemsByPartRequest = (query, year, type, part) =>
  request(api, query, {
    year,
    type,
    part,
  });
export const addItemRequest = (item) => request(api, ADD_ITEM, { item });
