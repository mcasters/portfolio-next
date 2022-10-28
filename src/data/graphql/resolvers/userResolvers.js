import cookie from 'cookie';

import { User } from '../../models/index';
import {
    isAuth,
    createUser,
    validPassword, setCookie,
} from '../../../utils/auth';

export default {
  Query: {
    async isAuthenticated(_parent, _args, context, _info) {
      return await isAuth(context.req);
    },
  },

  Mutation: {
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

    async signIn(_parent, { signInInput }, context, _info) {
      const user = await User.findOne({
        where: { username: signInInput.username },
      });
      if (user && validPassword(user, signInInput.password)) {
        setCookie(context.res, user);
        return { user };
      }
      throw new Error('Authentification incorrecte');
    },

    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          // secure: process.env.NODE_ENV === 'production',
        }),
      );
      return true;
    },
  },
};