import Sequelize, { Op } from 'sequelize';
import config from '../../next.config';

const sequelize = new Sequelize(
  config.databaseName,
  config.databaseUsername,
  config.databasePassword,
  {
    host: config.databaseHost,
    dialect: 'mysql',
    operatorsAliases: Op,
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
);

export default sequelize;
