import { isAuth } from '../../../components/utils/authUtils';
import { addImages } from '../../../components/utils/imageUtils';
import { Content } from '../../models';
import CONTENT from '../../../constants/content';

const contentResolvers = {
  Query: {
    allContent: async () => await Content.findAll(),
    // eslint-disable-next-line no-unused-vars
    content: async (parent, { key }, _context, _info) =>
      await Content.findOne({
        where: { key },
      }),
  },

  Mutation: {
    // eslint-disable-next-line no-unused-vars
    addContent: async (parent, { contentInput }, { req }, _info) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

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

    // eslint-disable-next-line no-unused-vars
    addPicture: async (root, { title }, { req }, _info) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const res = await addImages(title, CONTENT.TYPE);

      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      return true;
    },
  },
};

export default contentResolvers;
