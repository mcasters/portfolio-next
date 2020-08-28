export const VIEWER = `
  query ViewerQuery {
    viewer
  }
`;
export const SIGNIN = `
  mutation SignInMutation($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = `
  mutation SignUpMutation($username: String!, $email: String!, $password: String!) {
    signUp(input: { username:$username, email: $email, password: $password }) {
      user {
        id
        username
      }
    }
  }
`;

export const SIGNOUT = `
  mutation SignOutMutation {
    signOut
  }
`;

export const CONTENT = `
  query Content($key: String!) {
    content(key: $key) {
      text
    }
  }
`;
