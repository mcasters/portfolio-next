import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../../models/index';
import isAuthenticated from '../../lib/authService';

const JWT_SECRET = process.env.JWT_SECRET;

function createUserData(data) {
  const salt = bcrypt.genSaltSync();

  return {
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, salt),
  };
}

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

export default {
  Query: {
    async viewer(_parent, _args, context, _info) {
      return await isAuthenticated(context.req);
    },
  },

  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const lookupUser = await User.findOne({
        where: { username: args.input.username },
      });

      if (lookupUser) {
        throw new Error('Utilisateur déjà existant');
      }
      const user = await User.create(createUserData(args.input));
      return { user };
    },

    async signIn(_parent, args, context, _info) {
      const user = await User.findOne({
        where: { username: args.input.username },
      });
      if (user && validPassword(user, args.input.password)) {
        const token = jwt.sign(
          { username: user.username, id: user.id, time: new Date() },
          JWT_SECRET,
          {
            expiresIn: '6h',
          },
        );

        context.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        );

        return { user };
      }

      throw new Error('Authentification invalide');
    },

    async signOut(_parent, _args, context, _info) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          maxAge: -1,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        }),
      );

      return true;
    },
  },
};
