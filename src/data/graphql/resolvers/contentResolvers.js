import getAuthenticatedUser from '../services/authService';
import * as imageService from '../../image/imageServices';
import { Content } from '../../models';
import CONTENT from '../../../constants/content';

export default {
  Query: {
    getAllContent: async () => await Content.findAll(),
    getContent: async (parent, { key }, _context, _info) => await Content.findOne({ where: { key } }),
  },

  Mutation: {
    addContent: async (parent, { input }, { req }, _info) => {
      await getAuthenticatedUser(req);
      const { key } = input;

      let content = await Content.findOne({
        where: { key },
      });
      if (content) {
        content.update({
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

    addPicture: async (root, { picture, title }, { req }, _info) => {
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
