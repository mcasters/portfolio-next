import { gql } from 'apollo-server-micro';

export default gql`
  input ItemInput {
    id: ID
    type: String!
    title: String!
    date: String!
    technique: String!
    description: String
    height: Int!
    width: Int!
    length: Int
    hasImages: Boolean
  }

  type Item {
    id: ID
    title: String!
    date: String!
    technique: String!
    description: String
    length: Int
    height: Int!
    width: Int!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID!
    username: String
    email: String
    password: String
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  input ContentInput {
    key: String!
    text: String!
  }

  type Content {
    id: ID!
    key: String!
    text: String!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }
  input SignInInput {
    username: String!
    password: String!
  }

  type Query {
    allContent: [Content]
    content(key: String!): Content
    allItems(type: String!): [Item]
    itemsByPart(year: Int!, type: String!, part: Int!): [Item]
    user(id: ID!): User!
    viewer: Boolean!
  }

  type Mutation {
    addContent(contentInput: ContentInput!): Content!
    addPicture(title: String!): Boolean!
    addItem(item: ItemInput!): Item!
    updateItem(item: ItemInput!): Item!
    deleteItem(id: ID!, type: String!): Boolean!
    signUp(signUpInput: SignUpInput!): SignUpPayload!
    signIn(signInInput: SignInInput!): SignInPayload!
    signOut: Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
