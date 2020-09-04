import isAuthenticated from '../../utils/authUtils';
import { addImages } from '../../utils/writeImageUtils';
import { Content } from '../../models';
import CONTENT from '../../../constants/content';

export default {
  Query: {
    allContent: async () => await Content.findAll(),
    content: async (parent, { key }, _context, _info) =>
      await Content.findOne({
        where: { key: key },
      }),
  },

  Mutation: {
    addContent: async (parent, { contentInput }, { req }, _info) => {
      if (!(await isAuthenticated(req)))
        throw new Error("Erreur d'authentification");

      const { key, text } = contentInput;

      let content = await Content.findOne({
        where: { key: key },
      });
      if (content) {
        await content.update({ text });
        content = await Content.findOne({
          where: { key: key },
        });
      } else {
        content = await Content.create({
          key,
          text,
        });
      }
      return content;
    },

    addPicture: async (root, { title }, { req }, _info) => {
      if (!(await isAuthenticated(req)))
        throw new Error("Erreur d'authentification");

      const res = await addImages(title, CONTENT.TYPE);

      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      return true;
    },
  },
};
