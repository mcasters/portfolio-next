import DataType from 'sequelize';
import Model from './sequelize';

const User = Model.define(
  'User',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    username: {
      type: DataType.STRING(50),
      unique: true,
    },

    email: {
      type: DataType.STRING(50),
      validate: { isEmail: true },
      unique: true,
    },

    emailConfirmed: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },

    password: DataType.STRING(255),
  },
  {
    indexes: [{ fields: ['username'] }],
  },
);

export default User;

// User.sync({ force: true });
