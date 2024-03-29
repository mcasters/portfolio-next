import DataType from 'sequelize';
import Model from './sequelize';
import { parseISO } from 'date-fns';
import ITEM from '../../constants/item';

const Painting = Model.define(
  'Painting',
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
      type: DataType.DATEONLY,
      allowNull: false,
      get() {
        return parseISO(
          this.getDataValue('date'),
          ITEM.FORMAT_DATE,
          new Date(),
        );
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
  },
  {
    timestamps: true,
  },
);
// To force drop table if it exists
// Painting.sync({ force: true });

export default Painting;
