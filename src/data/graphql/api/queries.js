export const VIEWER = `
  query ViewerQuery {
    viewer
  }
`;
export const SIGNIN = `
  mutation SignInMutation($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = `
  mutation SignUpMutation($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
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

export const ADD_ITEM = `
  mutation AddItem($item: ItemInput!) {
    addItem(item: $item) {
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

export const UPDATE_ITEM = `
  mutation UpdateItem($item: ItemInput!) {
    updateItem(item: $item) {
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
