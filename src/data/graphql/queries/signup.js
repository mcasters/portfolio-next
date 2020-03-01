import gql from 'graphql-tag';

export default gql`
  mutation SignUpMutation($username: String!, $email: String!, $password: String!) {
    signUp(input: { username:$username, email: $email, password: $password }) {
      user {
        id
        username
      }
    }
  }
`;
