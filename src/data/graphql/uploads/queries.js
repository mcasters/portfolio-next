export const types = [
  `
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`,
];

export const queries = [
  `
  uploads: [File]
`,
];

export const resolvers = {
  RootQuery: {
    uploads: () => {},
  },
};
