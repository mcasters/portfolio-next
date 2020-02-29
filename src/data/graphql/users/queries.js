import { User } from '../../models/index';

export const types = [
  `
  type DatabaseUser {
    id: String
    username: String
    email: String
    password: String
  }
`,
];

export const queries = [
  `
  getAllUsers: [DatabaseUser]

  getUser(
    username: String!
  ): DatabaseUser
  
  checkIsAdmin: Boolean!
`,
];

export const resolvers = {
  RootQuery: {
    async getAllUsers() {
      return User.findAll();
    },

    async getUser(parent, { username }) {
      return User.findOne({
        where: { username },
      });
    },

    async checkIsAdmin(_, __, { req }) {
      return req.session.isAdmin;
    },
  },
};
