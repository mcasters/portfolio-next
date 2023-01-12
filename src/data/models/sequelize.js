import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
    port: process.env.DATABASE_PORT1 || process.env.DATABASE_PORT2,
  },
);

export default sequelize;