import ITEM from '../../constants/itemConstant';
const virtualLibraryPath = '/images';

class Item {
  constructor(title, type) {
    this.title = title;
    this.constDatas = {};
    this.isSculpture = false;
    this.filenames = [];
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
    this.setFilenames();
  }

  setFilenames = () => {
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
      filename => `${virtualLibraryPath}${this.constDatas.IMAGE.PATH}/${filename}`,
    );
  };

  getMDPaths = () => {
    return this.filenames.map(
       filename => `${virtualLibraryPath}${this.constDatas.IMAGE.PATH_MD}/${filename}`,
    );
  };

  getSMPaths = () => {
    return this.filenames.map(
      filename => `${virtualLibraryPath}${this.constDatas.IMAGE.PATH_SM}/${filename}`,
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

export default Item;
