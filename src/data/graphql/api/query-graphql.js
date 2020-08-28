import { request } from 'graphql-request';
import { VIEWER, SIGNIN, SIGNUP, SIGNOUT } from './queries';

const api = '/api/graphql';

export const viewerRequest = () => request(api, VIEWER);
export const signInRequest = (variables) => request(api, SIGNIN, variables);
export const signUpRequest = (variables) => request(api, SIGNUP, variables);
export const signoutRequest = () => request(api, SIGNOUT);
