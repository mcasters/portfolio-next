import { isAuth } from '../../../components/utils/authUtils';
import { addImages } from '../../../components/utils/imageUtils';
import { Content } from '../../models';
import CONTENT from '../../../constants/content';

export default {
  Query: {
    allContent: async () => await Content.findAll(),
    content: async (parent, { key }, _context, _info) =>
      await Content.findOne({
        where: { key },
      }),
  },

  Mutation: {
    addContent: async (parent, { contentInput }, { req }, _info) => {
      if (!(await isAuth(req)))
        throw new Error("Erreur d'authentification");

      const { key, text } = contentInput;

      let content = await Content.findOne({
        where: { key },
      });
      if (content) {
        await content.update({ text });
        content = await Content.findOne({
          where: { key },
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
      if (!(await isAuth(req)))
        throw new Error("Erreur d'authentification");

      const res = await addImages(title, CONTENT.TYPE);

      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      return true;
    },
  },
};