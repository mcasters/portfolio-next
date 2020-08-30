import DataType from 'sequelize';
import Model from '../sequelize';

const Content = Model.define('Content', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
    get() {
      return this.getDataValue('id');
    },
  },

  key: {
    type: DataType.STRING(50),
    allowNull: false,
    get() {
      return this.getDataValue('key');
    },
    set(value) {
      this.setDataValue('key', value);
    },
  },

  text: {
    type: DataType.TEXT,
    allowNull: false,
    get() {
      return this.getDataValue('text');
    },
    set(value) {
      this.setDataValue('text', value);
    },
  },
});

// To force drop table if it exists
// Content.sync({ force: true });

export default Content;
