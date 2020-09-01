import ITEM from '../../constants/itemConstant';
const virtualLibraryPath = '/images';

class ItemObject {
  constructor(item, type) {
    this.type = type;
    this.isSculpture = type === ITEM.SCULPTURE.TYPE;

    this.title = item.title;
    this.date = item.date;
    this.technique = item.technique;
    this.description = item.description;
    this.height = item.height;
    this.width = item.width;
    this.length = this.isSculpture ? item.length : null;

    this.constDatas = {};
    this.filenames = [];

    this.initConstDatas();
    this.initFilenames();
  }

  initConstDatas = () => {
    switch (this.type) {
      case ITEM.PAINTING.TYPE:
        this.constDatas = ITEM.PAINTING;
        break;
      case ITEM.DRAWING.TYPE:
        this.constDatas = ITEM.DRAWING;
        break;
      case ITEM.SCULPTURE.TYPE:
        this.constDatas = ITEM.SCULPTURE;
        break;
      default:
        throw new Error(`Type ${type} inexistant`);
    }
  };

  initFilenames = () => {
    if (this.isSculpture) {
      let i;
      for (i = 1; i < 5; i++) {
        this.filenames.push(`${this.title}_${i}.jpg`);
      }
    } else {
      this.filenames.push(`${this.title}.jpg`);
    }
  };

  getMainPaths = () => {
    return this.filenames.map(
      (filename) =>
        `${virtualLibraryPath}${this.constDatas.IMAGE.PATH}/${filename}`,
    );
  };

  getMDPaths = () => {
    return this.filenames.map(
      (filename) =>
        `${virtualLibraryPath}${this.constDatas.IMAGE.PATH_MD}/${filename}`,
    );
  };

  getSMPaths = () => {
    return this.filenames.map(
      (filename) =>
        `${virtualLibraryPath}${this.constDatas.IMAGE.PATH_SM}/${filename}`,
    );
  };

  getAllPaths = () => {
    let tab = [];

    tab.push(this.getMainPaths());
    tab.push(this.getMDPaths());
    tab.push(this.getSMPaths());

    return tab;
  };

  getFilenames = () => {
    return this.filenames;
  };

  getAltImage = () => {
    return this.constDatas.IMAGE.ALT_IMAGE;
  };

  getIsSculpture = () => {
    return this.isSculpture;
  };
}

export default ItemObject;
