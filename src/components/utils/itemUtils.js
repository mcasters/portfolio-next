import CONSTANT from '../../constants/itemConstant';
import ITEM from '../../constants/itemConstant';

const libraryPath = '/images';

export const getItemInputGraphql = (item, type, hasImages) => {
  return {
    type,
    id: item.id ? item.id : undefined,
    title: item.title,
    date: item.date,
    technique: item.technique,
    description: item.description,
    height: item.height,
    width: item.width,
    length: item.length,
    hasImages,
  };
};

export const getEmptyItemInput = (isSculpture) => {
  return {
    id: '',
    title: '',
    date: new Date(),
    technique: '',
    description: '',
    height: '',
    width: '',
    length: isSculpture ? '' : undefined,
    pictures: isSculpture ? ['', '', '', ''] : [''],
  };
};

export const getItemInputToUpdate = (item) => {
  const isSculpture = item.type === CONSTANT.SCULPTURE.TYPE;
  return {
    id: item.id,
    title: item.title,
    date: new Date(item.date),
    technique: item.technique,
    description: item.description,
    height: item.height,
    width: item.width,
    length: isSculpture ? item.length : undefined,
    pictures: isSculpture ? ['', '', '', ''] : [''],
  };
};

export const picturesIsFull = (item) => {
  const full = (picture) => picture !== '';
  return item.pictures.every(full);
};

export const picturesIsEmpty = (item) => {
  const empty = (picture) => picture === '';
  return item.pictures.every(empty);
};

export const picturesIsFullOrEmpty = (item) => {
  return picturesIsFull(item) || picturesIsEmpty(item);
};

export const getFilenamesTab = (item) => {
  let tab = [];
  if (item.type === CONSTANT.SCULPTURE.TYPE) {
    let i;
    for (i = 1; i < 5; i++) {
      tab[i - 1] = `${item.title}_${i}.jpg`;
    }
  } else {
    tab[0] = `${item.title}.jpg`;
  }
  return tab;
};

export const getMainPaths = (item) => {
  const filenames = getFilenamesTab(item);
  const path = `${libraryPath}${getConst(item.type).IMAGE.PATH}`;

  return filenames.map((filename) => `${path}/${filename}`);
};

export const getMDPaths = (item) => {
  const filenames = getFilenamesTab(item);
  const path = `${libraryPath}${getConst(item.type).IMAGE.PATH_MD}`;

  return filenames.map((filename) => `${path}/${filename}`);
};

export const getSMPaths = (item) => {
  const filenames = getFilenamesTab(item);
  const path = `${libraryPath}${getConst(item.type).IMAGE.PATH_SM}`;

  return filenames.map((filename) => `${path}/${filename}`);
};

export const getEnhancedItem = (item, type) => {
  const prov = {...item, type};
  return {
    ...prov,
    alt: getAltImage(prov),
    SMPaths: getSMPaths(prov),
    MDPaths: getMDPaths(prov),
    LGPaths: getMainPaths(prov),
  };
};

const getConst = (type) => {
  switch (type) {
    case CONSTANT.PAINTING.TYPE:
      return CONSTANT.PAINTING;
    case CONSTANT.DRAWING.TYPE:
      return CONSTANT.DRAWING;
    case CONSTANT.SCULPTURE.TYPE:
      return CONSTANT.SCULPTURE;
    default:
      return new Error(`Type ${type} inexistant`);
  }
};

export const getAltImage = (item) => {
  switch (item.type) {
    case ITEM.PAINTING.TYPE:
      return ITEM.PAINTING.IMAGE.ALT_IMAGE;
    case ITEM.DRAWING.TYPE:
      return ITEM.DRAWING.IMAGE.ALT_IMAGE;
    case ITEM.SCULPTURE.TYPE:
      return ITEM.SCULPTURE.IMAGE.ALT_IMAGE;
    default:
      return;
  }
};
