import { Content } from '../../models/index';

export const types = [
  `
  type Content {
    id: ID!
    key: String!
    text: String!
  }
`,
];

export const queries = [
  `
  getAllContent: [Content]
  
  getContent(key: String!): Content
`,
];

export const resolvers = {
  RootQuery: {
    async getAllContent() {
      const contents = await Content.findAll();
      return contents;
    },

    async getContent(parent, { key }) {
      const content = await Content.findOne({
        where: { key },
      });
      return content;
    },
  },
};
