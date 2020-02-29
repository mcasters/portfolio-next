import getAuthenticatedUser from '../services/authService';
import * as imageService from '../../image/imageServices';
import { Content } from '../../models';
import CONTENT from '../../../constants/content';

export default {
  Query: {
    getAllContent: () => Content.findAll(),
    getContent: (parent, { key }) => Content.findOne({ where: { key } }),
  },

  Mutation: {
    addContent: async (parent, { input }, { req }) => {
      await getAuthenticatedUser(req);
      const { key } = input;

      let content = Content.findOne({
        where: { key },
      });
      if (content) {
        content.update({
          text: input.text,
        });
        content = Content.findOne({
          where: { key },
        });
      } else {
        content = Content.create(input);
      }
      return content;
    },

    addPicture: async (root, { picture, title }, { req }) => {
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
