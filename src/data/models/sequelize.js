/*eslint-disable no-undef*/
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: 8889,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
);

export default sequelize;
