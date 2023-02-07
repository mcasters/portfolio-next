import { gql } from 'graphql-request';

const typeDefs = gql`
  scalar Date

  scalar File

  input ItemInput {
    id: ID
    type: String!
    title: String!
    date: Date!
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
    date: Date!
    technique: String!
    description: String
    length: Int
    height: Int!
    width: Int!
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
    itemsByYear(type: String!, year: Int!): [Item]
    user(id: ID!): User!
    isAuthenticated: Boolean!
  }

  type Mutation {
    addItem(item: ItemInput!): Item!
    addContent(contentInput: ContentInput!): Content!
    saveFilesInTemp(files: [File], filenames: [String]): Boolean!
    addPicture(title: String!): Boolean!
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

export default typeDefs;
