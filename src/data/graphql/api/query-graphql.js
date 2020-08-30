import { request } from 'graphql-request';
import {
  ADD_ITEM,
  DELETE_ITEM,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  UPDATE_ITEM,
  VIEWER,
} from './queries';

const api = '/api/graphql';

export const viewerRequest = () => request(api, VIEWER);

export const signoutRequest = () => request(api, SIGNOUT);

export const contentRequest = (query, key) => request(api, query, { key });

export const allItemsRequest = (query, type) => request(api, query, { type });

export const itemsByPartRequest = (query, year, type, part) =>
  request(api, query, {
    year,
    type,
    part,
  });

/// POST
export const signInRequest = async (username, password) =>
  withErrorHandler(SIGNIN, { signInInput: { username, password } });

export const signUpRequest = (username, email, password) =>
  withErrorHandler(SIGNUP, { signUpInput: { username, email, password } });

export const addItemRequest = (item) => withErrorHandler(ADD_ITEM, { item });

export const updateItemRequest = (item) => withErrorHandler(UPDATE_ITEM, { item });

export const deleteItemRequest = async (id, type) =>
  withErrorHandler(DELETE_ITEM, { id, type });

export const addContentRequest = (item) => withErrorHandler(ADD_ITEM, { item });

const withErrorHandler = async (query, variables) => {
  try {
    return Object.assign({}, { data: await request(api, query, variables) });
  } catch (e) {
    return Object.assign({}, { error: e });
  }
};
