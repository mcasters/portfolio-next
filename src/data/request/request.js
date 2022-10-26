import { request } from 'graphql-request';

import {
  ADD_CONTENT,
  ADD_ITEM,
  ADD_PICTURE,
  DELETE_ITEM,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  UPDATE_ITEM,
  ISAUTHENTICATED,
} from '../graphql/queries';

/*
 * *****************************
 * From front = No ssr
 * *****************************
 */

const api = '/api/graphql';

/*
Error handling for post methods
 */

const withErrorHandler = async (query, variables) => {
  try {
    return Object.assign({}, { data: await request(api, query, variables) });
  } catch (e) {
    return Object.assign({}, { error: e.response.errors[0] });
  }
};

/*
 * Authentication
 */

// GET
export const isAuthenticatedRequest = () => request(api, ISAUTHENTICATED);
export const signoutRequest = () => request(api, SIGNOUT);

// POST
export const signInRequest = (username, password) =>
  withErrorHandler(SIGNIN, { signInInput: { username, password } });

export const signUpRequest = (username, email, password) =>
  withErrorHandler(SIGNUP, { signUpInput: { username, email, password } });

/*
 * Content
 */

// GET
export const contentRequest = (query, key) => request(api, query, { key });

// POST
export const addContentRequest = (key, text) =>
  withErrorHandler(ADD_CONTENT, { contentInput: { key, text } });

/*
 * Items
 */

// GET
export const allItemsRequest = (query, type) => request(api, query, { type });
export const itemsByPartRequest = (query, year, type, part) =>
  request(api, query, {
    year,
    type,
    part,
  });

// POST
export const addItemRequest = (item) => withErrorHandler(ADD_ITEM, { item });
export const updateItemRequest = (item) =>
  withErrorHandler(UPDATE_ITEM, { item });
export const deleteItemRequest = async (id, type) =>
  withErrorHandler(DELETE_ITEM, { id, type });

/*
 * Images
 */

// POST
export const addPictureRequest = (title) =>
  withErrorHandler(ADD_PICTURE, { title });