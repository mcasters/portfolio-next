/*eslint-disable no-undef*/
import Sequelize from 'sequelize';

const dev = process.env.NODE_ENV !== 'production';

const devParams = {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  port: process.env.DATABASE_PORT1 || process.env.DATABASE_PORT2,
};

const prodParams = {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
};

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  dev ? devParams : prodParams,
);

export default sequelize;
