import DataType from 'sequelize';
import Model from '../sequelize';

const Sculpture = Model.define(
  'Sculpture',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
      get() {
        return this.getDataValue('id');
      },
    },

    title: {
      type: DataType.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue('title');
      },
      set(value) {
        this.setDataValue('title', value);
      },
    },

    date: {
      type: DataType.DATEONLY(10),
      allowNull: false,
      get() {
        return this.getDataValue('date');
      },
      set(value) {
        this.setDataValue('date', value);
      },
    },

    technique: {
      type: DataType.STRING(255),
      allowNull: false,
      get() {
        return this.getDataValue('technique');
      },
      set(value) {
        this.setDataValue('technique', value);
      },
    },

    description: {
      type: DataType.STRING(255),
      allowNull: true,
      get() {
        return this.getDataValue('description');
      },
      set(value) {
        this.setDataValue('description', value);
      },
    },

    height: {
      type: DataType.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('height');
      },
      set(value) {
        this.setDataValue('height', value);
      },
    },

    width: {
      type: DataType.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('width');
      },
      set(value) {
        this.setDataValue('width', value);
      },
    },

    length: {
      type: DataType.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('length');
      },
      set(value) {
        this.setDataValue('length', value);
      },
    },
  },
  {
    timestamps: true,
  },
);

// Sculpture.sync({ force: true });

export default Sculpture;
