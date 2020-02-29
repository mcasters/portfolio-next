import { User } from '../../models';
import bcrypt from 'bcrypt';
import config from '../../../../next.config';

export default {
  Query: {
    getAllUsers: () => User.findAll(),
    getUser: (parent, { username }) => User.findOne({ where: { username } }),
    checkIsAdmin: (_, __, { context }) => context.session.isAdmin
  },

  Mutation: {
    signup: async (parent, { input }, { context }) => {
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

      context.session.userId = newUser.id;

      return true;
    },

    login: async (_, { input: { username, password } }, { context }) => {
      const dbUser = await User.findOne({
        where: { username },
      });
      if (!dbUser) return false;
      const match = await bcrypt.compare(password, dbUser.password);

      if (!match) return false;

      context.session.userId = dbUser.id;

      return true;
    },

    logout: (_, __, { req, res }) => {
      req.session.destroy(() => {
        return false;
      });
      res.clearCookie(config.auth.jwt.name);
      return true;
    },
  },
};
