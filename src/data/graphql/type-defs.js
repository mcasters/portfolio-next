import gql from 'graphql-tag';

export default `
  scalar Upload

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
    id: String
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

  input SignUpInput {
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    getAllContent: [Content]
    getContent(key: String!): Content
    getAllItems(type: String!): [Item]
    getItemsByPart(year: Int!, type: String!, half: Int!): [Item]
    getUser: User
  }

  type Mutation {
    addContent(input: ContentInput!): Content!
    addPicture(picture: Upload!, title: String!): Boolean!
    addItem(input: ItemInput!): Item!
    updateItem(id: ID!, input: ItemInput!): Item!
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
