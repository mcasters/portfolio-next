import { User } from '../../models/index';
import {
  isAuth,
  createUser,
  validPassword,
  setCookie,
  deleteCookie,
} from '../../../components/utils/authUtils';

const userResolvers = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    async isAuthenticated(_parent, _args, context, _info) {
      return await isAuth(context.req);
    },
  },

  Mutation: {
    // eslint-disable-next-line no-unused-vars
    async signUp(_parent, { signUpInput }, _context, _info) {
      const lookupUser = await User.findOne({
        where: { username: signUpInput.username },
      });

      if (lookupUser) {
        throw new Error('Utilisateur déjà existant');
      }
      const user = await User.create(createUser(signUpInput));
      return { user };
    },

    // eslint-disable-next-line no-unused-vars
    async signIn(_parent, { signInInput }, context, _info) {
      const user = await User.findOne({
        where: { username: signInInput.username },
      });

      if (user && validPassword(user, signInInput.password)) {
        await setCookie(context.res, user);
        return { user };
      }
      throw new Error('Authentification incorrecte');
    },

    // eslint-disable-next-line no-unused-vars
    async signOut(_parent, _args, context, _info) {
      try {
        await deleteCookie(context.res);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};

export default userResolvers;
