import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import getConfig from 'next/config';
import bcrypt from 'bcrypt';

import { User } from '../../models/index';

const JWT_SECRET = getConfig().auth.jwt.secret;

function createUser(data) {
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
    async getUser(_parent, _args, context, _info) {
      const { token } = cookie.parse(context.req.headers.cookie ?? '');
      if (token) {
        try {
          const { username } = jwt.verify(token, JWT_SECRET);

          return User.findOne(user => user.username === username);
        } catch {
          throw new AuthenticationError("Token d'authentication invalide");
        }
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const lookupUser = await User.findOne(
        user => user.username === args.input.username,
      );

      if (lookupUser) {
        throw new AuthenticationError('Utilisateur déjà existant');
      }
      const user = createUser(args.input);

      const newUser = await User.create(user);

      return { newUser };
    },

    async signIn(_parent, args, context, _info) {
      const user = User.findOne(user => user.username === args.input.username);

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

      throw new UserInputError('Authentification invalide');
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
