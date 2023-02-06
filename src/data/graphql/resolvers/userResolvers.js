import { User } from '../../models/index';
import {
  isAuth,
  createUser,
  isValidPassword,
} from '../../../components/utils/authUtils';

const userResolvers = {
  Query: {
    // eslint-disable-next-line no-unused-vars
    async isAuthenticated(_parent, _args, context, _info) {
      const { req } = context;
      return isAuth(req);
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
      const { req } = context;

      if (user && isValidPassword(user, signInInput.password)) {
        req.session.user = user;
        req.session.save();
        return { user };
      } else {
        throw new Error('Authentification incorrecte');
      }
    },

    // eslint-disable-next-line no-unused-vars
    async signOut(_parent, _args, context, _info) {
      context.req.user = null;
      return true;
    },
  },
};

export default userResolvers;
