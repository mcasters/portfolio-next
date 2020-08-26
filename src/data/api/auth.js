import { request, gql } from 'graphql-request';

const port = parseInt(process.env.PORT, 10) || 3000;
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const api = `${url}:${port}/api/graphql`;

export async function signUp(username, email, password) {
  const query = gql`
    mutation SignUpMutation($username: String!, $email: String!, $password: String!) {
      signUp(input: { username:$username, email: $email, password: $password }) {
        user {
          id
          username
        }
      }
    }
  `
  const variables = {username, email, password};
  const data = await request(api, query, variables);
  return data.signUp.user;
}
