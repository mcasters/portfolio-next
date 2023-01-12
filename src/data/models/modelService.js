import { Sequelize, Op } from 'sequelize';

import ITEM from '../../constants/itemConstant';
import { Drawing, Painting, Sculpture } from './index';

class ModelService {
  constructor(type) {
    this.model = {};
    this.init(type);
  }

  init(type) {
    if (type === ITEM.PAINTING.TYPE) {
      this.model = Painting;
    } else if (type === ITEM.DRAWING.TYPE) {
      this.model = Drawing;
    } else if (type === ITEM.SCULPTURE.TYPE) {
      this.model = Sculpture;
      this.isSculpture = true;
    } else throw new Error(`Type ${type} inexistant`);
  }

  get(name) {
    if (!this.has(name)) {
      throw new Error(`Property ${name} not found`);
    }
    return this.model[name];
  }

  has(name) {
    return name in this.model;
  }

  getByName = async (title) => {
    return this.model.findOne({
      where: { title },
    });
  };

  getById = async (id) => {
    return this.model.findOne({
      where: { id },
    });
  };

  getAllItems = async () => {
    return this.model.findAll({
      order: Sequelize.col('date'),
    });
  };

  getItemsByYear = async (year) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    return this.model.findAll({
      where: {
        date: {
          [Op.gte]: start,
          [Op.lte]: end,
        },
      },
      order: Sequelize.col('date'),
    });
  };

  add = async (data) => {
    return this.model.create(data);
  };

  update = async (id, data) => {
    await this.model.update(
      {
        ...data,
      },
      { where: { id } },
    );

    return await this.model.findOne({
      where: { id },
    });
  };

  delete = async (id) => {
    return this.model.destroy({
      where: { id },
    });
  };
}

export default ModelService;