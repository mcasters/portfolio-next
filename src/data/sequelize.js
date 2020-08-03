import Sequelize, { Op } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    operatorsAliases: Op,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
);

export default sequelize;
