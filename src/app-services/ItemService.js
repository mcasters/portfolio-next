import ITEM from '../constants/item';

class ItemService {
  constructor(type) {
    this.constDatas = {};
    this.isSculpture = false;
    this.init(type);
  }

  init(type) {
    if (type === ITEM.PAINTING.TYPE) {
      this.constDatas = ITEM.PAINTING;
    } else if (type === ITEM.DRAWING.TYPE) {
      this.constDatas = ITEM.DRAWING;
    } else if (type === ITEM.SCULPTURE.TYPE) {
      this.constDatas = ITEM.SCULPTURE;
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

  getPath = () => {
    return this.constDatas.PATH;
  };

  getTitle = () => {
    return this.constDatas.TITLE;
  };

  getAltImage = () => {
    return this.constDatas.ALT_IMAGE;
  };

  getIsSculpture = () => {
    return this.isSculpture;
  };
}

export default ItemService;
