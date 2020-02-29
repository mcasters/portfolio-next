import gql from 'graphql-tag';

export default `
  scalar Upload

  type User {
    id: ID!
    name: String!
    status: String!
  }

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

  type DatabaseUser {
    id: String
    username: String
    email: String
    password: String
  }

  type AdminStatus {
    isConnected: Boolean!
  }

  input ContentInput {
    key: String!
    text: String!
  }

  input ItemInput {
    pictures: [Upload]!
    type: String!
    title: String!
    date: String!
    technique: String!
    description: String
    length: Int
    height: Int!
    width: Int!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    getAllContent: [Content]
    getContent(key: String!): Content
    getAllItems(type: String!): [Item]
    getItemsByPart(year: Int!, type: String!, half: Int!): [Item]
    getAllUsers: [DatabaseUser]
    getUser(username: String!): DatabaseUser
    checkIsAdmin: Boolean!
  }

  type Mutation {
    addContent(input: ContentInput!): Content!
    addPicture(picture: Upload!, title: String!): Boolean!
    addItem(input: ItemInput!): Item!
    updateItem(id: ID!, input: ItemInput!): Item!
    deleteItem(id: ID!, type: String!): ID!
    uploadFile(file: Upload!): Boolean
    signup(input: SignupInput!): Boolean
    login(input: LoginInput!): Boolean
    logout: Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
