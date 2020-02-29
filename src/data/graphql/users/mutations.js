/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';

import { User } from '../../models/index';
import config from '../../../../next.config';

export const types = [
  `
  input SignupInput {
    username: String!
    email: String!
    password: String!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }
`,
];

export const mutations = [
  `
  signup(
    input: SignupInput!
  ): Boolean
  
  login(
    input: LoginInput!
  ): Boolean
  
  logout: Boolean
`,
];

export const resolvers = {
  Mutation: {
    signup: async (parent, { input }, { req }) => {
      const lookupUser = await User.findOne({
        where: { username: input.username },
      });

      if (lookupUser) {
        throw new Error('Utilisateur déjà existant');
      }

      const hashPassword = await bcrypt.hash(input.password, 10);

      if (!hashPassword) {
        throw new Error('Erreur de hashing du mot de passe');
      }

      const newUser = await User.create({
        username: input.username,
        email: input.email,
        password: hashPassword,
      });

      if (!newUser) throw new Error('Erreur à la création du user en BDD');

      req.session.userId = newUser.id;

      return true;
    },

    login: async (_, { input: { username, password } }, { req }) => {
      const dbUser = await User.findOne({
        where: { username },
      });
      if (!dbUser) return false;
      const match = await bcrypt.compare(password, dbUser.password);

      if (!match) return false;

      req.session.userId = dbUser.id;

      return true;
    },

    logout: async (_, __, { req, res }) => {
      req.session.destroy(() => {
        return false;
      });
      res.clearCookie(config.auth.jwt.name);
      return true;
    },
  },
};
