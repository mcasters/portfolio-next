import { Content } from '../../models';
import getAuthenticatedUser from '../services/authService';
import CONTENT from '../../../constants/content';
import * as imageService from '../../image/imageServices';

export const types = [
  `
  input ContentInput {
    key: String!
    text: String!
  }
  `,
];

export const mutations = [
  `
  addContent(input: ContentInput!): Content!
  
  addPicture(picture: Upload!, title: String!): Boolean!
`,
];

export const resolvers = {
  Mutation: {
    addContent: async (parent, { input }, { req }) => {
      await getAuthenticatedUser(req);
      const { key } = input;

      let content = await Content.findOne({
        where: { key },
      });
      if (content) {
        await content.update({
          text: input.text,
        });
        content = await Content.findOne({
          where: { key },
        });
      } else {
        content = await Content.create(input);
      }
      return content;
    },

    async addPicture(root, { picture, title }, { req }) {
      const isAdmin = await getAuthenticatedUser(req);

      if (!isAdmin) throw new Error("Erreur d'authentification");

      const pictures = [picture];
      const res = await imageService.processImageUpload(
        pictures,
        title,
        CONTENT.TYPE,
      );

      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      return true;
    },
  },
};
