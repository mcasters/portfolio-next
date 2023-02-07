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
  ISAUTHENTICATED, SAVE_FILE_IN_TEMP,
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

const errorHandler = async (query, variables) => {
  try {
    return { data: await request(api, query, variables) };
  } catch (e) {
    return { error: e.response.errors[0].extensions.originalError.message || e.response.errors[0] };
  }
};

/*
 * Authentication
 */

// GET
export const isAuthenticatedRequest = () => request(api, ISAUTHENTICATED);
export const signOutRequest = () => request(api, SIGNOUT);

// POST
export const signInRequest = (username, password) =>
  errorHandler(SIGNIN, { signInInput: { username, password } });

export const signUpRequest = (username, email, password) =>
  errorHandler(SIGNUP, { signUpInput: { username, email, password } });

/*
 * Content
 */

// GET
export const contentRequest = (query, key) => request(api, query, { key });

// POST
export const addContentRequest = (key, text) =>
  errorHandler(ADD_CONTENT, { contentInput: { key, text } });

/*
 * Items
 */

// GET
export const allItemsRequest = (query, type) => request(api, query, { type });

// POST
export const addItemRequest = (item) => errorHandler(ADD_ITEM, { item });
export const updateItemRequest = (item) =>
  errorHandler(UPDATE_ITEM, { item });
export const deleteItemRequest = (id, type) =>
  errorHandler(DELETE_ITEM, { id, type });

/*
 * Images
 */

// POST
export const addPictureRequest = (title) =>
  errorHandler(ADD_PICTURE, { title });

export const saveFilesInTempRequest = (files, filenames) =>
  errorHandler(SAVE_FILE_IN_TEMP, { files, filenames });
