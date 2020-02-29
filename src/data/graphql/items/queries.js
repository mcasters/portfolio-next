import ItemModelService from '../services/ItemModelService';

export const types = [
  `
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
`,
];

export const queries = [
  `
  getAllItems(
     type: String!
  ): [Item]
  
  getItemsByPart(
    year: Int!
    type: String!
    half: Int!
  ): [Item]
`,
];

export const resolvers = {
  RootQuery: {
    async getAllItems(parent, { type }) {
      const itemService = new ItemModelService(type);
      return itemService.getAllItems();
    },

    async getItemsByPart(parent, { type, year, half }) {
      const itemService = new ItemModelService(type);
      return itemService.getItemsByPart(year, half);
    },
  },
};
