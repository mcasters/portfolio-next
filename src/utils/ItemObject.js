import ITEM from '../constants/itemConstant';
import { picturesIsFull } from '../components/administration/formUtils';
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
    this.initFilenames();
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

  initFilenames = () => {
    this.filenames = this.getFilenamesTab(this.title);
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

  getAllPaths = () => {
    let tab = [];

    tab.push(this.getMainPaths());
    tab.push(this.getMDPaths());
    tab.push(this.getSMPaths());

    return tab;
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

  getItemData = () => {
    return {
      title: this.title,
      date: this.date,
      technique: this.technique,
      description: this.description,
      height: this.height,
      width: this.width,
      length: this.length,
      pictures: this.#isSculpture ? ['', '', '', ''] : [''],
    };
  };

  updateFromItem = (itemData) => {
    if (itemData.title !== this.title) this.updateFilenames(itemData.title);
    this.setUpdatableAttributes(itemData);
    return this;
  };

  updateFilenames = (title) => {
    this.filenames = this.getFilenamesTab(title);
  };

  getGraphqlObject = (isUpdate) => {
    let graphqlObject = {
      type: this.#type,
      title: this.title,
      date: this.date,
      technique: this.technique,
      description: this.description,
      height: this.height,
      width: this.width,
    };

    if (this.#isSculpture)
      graphqlObject = { ...graphqlObject, length: this.length };

    if (isUpdate)
      graphqlObject = {
        ...graphqlObject,
        id: this.#id,
        hasImages: this.hasImages,
      };

    return graphqlObject;
  };
}

export default ItemObject;