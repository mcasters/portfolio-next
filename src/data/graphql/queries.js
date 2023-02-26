import { gql } from 'graphql-request';

export const ISAUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated
  }
`;
export const SIGNIN = gql`
  mutation SignInMutation($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      user {
        id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUpMutation($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      user {
        id
        username
      }
    }
  }
`;

export const SIGNOUT = gql`
  mutation SignOutMutation {
    signOut
  }
`;

export const CONTENT = gql`
  query Content($key: String!) {
    content(key: $key) {
      text
    }
  }
`;

export const ALL_ITEMS = gql`
  query allItems($type: String!) {
    allItems(type: $type) {
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

export const ALL_ITEMS_ADMIN = gql`
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

export const ITEMS_BY_YEAR = gql`
  query ItemsByYear($type: String!, $year: Int!) {
    itemsByYear(type: $type, year: $year) {
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

export const ADD_ITEM = gql`
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

export const UPDATE_ITEM = gql`
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

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!, $type: String!) {
    deleteItem(id: $id, type: $type)
  }
`;

export const ADD_CONTENT = gql`
  mutation AddContent($contentInput: ContentInput!) {
    addContent(contentInput: $contentInput) {
      id
      key
      text
    }
  }
`;

export const SAVE_FILES = gql`
  mutation SaveFiles($files: [File]!, $filenames: [String]!, $type: String!) {
    saveFiles(files: $files, filenames: $filenames, type: $type)
  }
`;
