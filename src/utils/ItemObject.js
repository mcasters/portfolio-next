import ITEM from '../constants/itemConstant';
import { picturesIsFull } from '../components/administration/utils/formUtils';
const libraryPath = '/images';

class ItemObject {
  #id;
  #type;
  #isSculpture;
  #constDatas;

  constructor(item, type) {
    this.initAttributes(item, type);
  }

  initAttributes = (item, type) => {
    this.#id = item?.id || '';
    this.#type = type;
    this.#isSculpture = this.#type === ITEM.SCULPTURE.TYPE;
    this.setUpdatableAttributes(item);
    this.initConstDatas();
  };

  setUpdatableAttributes = (item) => {
    this.title = item?.title || '';
    this.date = item?.date || '';
    this.technique = item?.technique || '';
    this.description = item?.description || '';
    this.height = item?.height || '';
    this.width = item?.width || '';
    this.length = item?.length || '';
    this.hasImages = item?.pictures ? picturesIsFull(item.pictures) : false;
    this.filenames = this.title === '' ? [] : this.getFilenamesTab();
  };

  initConstDatas = () => {
    switch (this.#type) {
      case ITEM.PAINTING.TYPE:
        this.#constDatas = ITEM.PAINTING;
        break;
      case ITEM.DRAWING.TYPE:
        this.#constDatas = ITEM.DRAWING;
        break;
      case ITEM.SCULPTURE.TYPE:
        this.#constDatas = ITEM.SCULPTURE;
        break;
      default:
        throw new Error(`Type ${this.type} inexistant`);
    }
  };

  getFilenamesTab = () => {
    let tab = [];
    if (this.#isSculpture) {
      let i;
      for (i = 1; i < 5; i++) {
        tab[i - 1] = `${this.title}_${i}.jpg`;
      }
    } else {
      tab[0] = `${this.title}.jpg`;
    }
    return tab;
  };

  getMainPaths = () => {
    return this.filenames.map(
      (filename) => `${libraryPath}${this.#constDatas.IMAGE.PATH}/${filename}`,
    );
  };

  getMDPaths = () => {
    return this.filenames.map(
      (filename) =>
        `${libraryPath}${this.#constDatas.IMAGE.PATH_MD}/${filename}`,
    );
  };

  getSMPaths = () => {
    return this.filenames.map(
      (filename) =>
        `${libraryPath}${this.#constDatas.IMAGE.PATH_SM}/${filename}`,
    );
  };

  getId = () => {
    return this.#id;
  };

  getType = () => {
    return this.#type;
  };

  getIsSculpture = () => {
    return this.#isSculpture;
  };

  getAltImage = () => {
    return this.#constDatas.IMAGE.ALT_IMAGE;
  };
}

export default ItemObject;