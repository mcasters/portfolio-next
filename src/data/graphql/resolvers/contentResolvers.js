import { isAuth } from '../../../components/utils/authUtils';
import { Content } from '../../models';

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
  },
};

export default contentResolvers;
