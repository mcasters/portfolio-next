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

export const ALL_ITEMS = `
  query allItems($type: String!) {
  allItems(type: $type) {
    id
    title
    date
    technique
    description
    height
    width
    length
  }
}
`;

export const ITEMS_BY_PART = `
  query ItemsByPart($year: Int!, $type: String!, $part: Int!) {
    itemsByPart(year: $year, type: $type, part: $part) {
      title
      date
      technique
      description
      height
      width
      length
    }
  }
`;
