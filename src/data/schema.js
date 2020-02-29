// import { makeExecutableSchema } from 'graphql-tools';
import { makeExecutableSchema } from 'apollo-server-micro';
import { types, resolvers, mutations, queries } from './graphql/schema';

const RootQuery = [
  `
  type RootQuery {
    ${queries}
  }
`,
];

const Mutation = [
  `
  type Mutation {
    ${mutations}
  }
`,
];

const SchemaDefinition = [
  `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`,
];

const typeDefs = [
  ...SchemaDefinition,
  ...RootQuery,
  ...Mutation,
  ...types,
];

/*export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});*/

export default {
  typeDefs,
  resolvers,
};

