import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Content {
    id: ID!
    key: String!
    text: String!
  }

  type Item {
    id: ID!
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

  input ItemInput {
    id: ID
    type: String!
    title: String!
    date: String!
    technique: String!
    description: String
    length: Int
    height: Int!
    width: Int!
    hasImages: Boolean
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
    getAllContent: [Content]
    content(key: String!): Content
    getAllItems(type: String!): [Item]
    getItemsByPart(year: Int!, type: String!, half: Int!): [Item]
    user(id: ID!): User!
    viewer: Boolean!
  }

  type Mutation {
    addContent(input: ContentInput!): Content!
    addPicture(picture: Upload!, title: String!): Boolean!
    addItem(item: ItemInput!): Item!
    updateItem(item: ItemInput!): Item!
    deleteItem(id: ID!, type: String!): ID!
    uploadFile(file: Upload!): Boolean
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
