import CONSTANT from '../../../constants/itemConstant';

const libraryPath = '/images';

export const getGraphqlObject = (item, type) => {
  const object = {
    type,
    title: item.title,
    date: item.date,
    technique: item.technique,
    description: item.description,
    height: item.height,
    width: item.width,
  };

  return type !== CONSTANT.SCULPTURE.TYPE
    ? object
    : Object.assign({}, object, { length: item.length });
};

export const getEmptyItem = (isSculpture) => {
  return {
    title: '',
    date: new Date(),
    technique: '',
    description: '',
    height: '',
    width: '',
    length: '',
    pictures: isSculpture ? ['', '', '', ''] : [''],
  };
};

export const getItemToUpdate = (item, type) => {
  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  return {
    id: item.id,
    title: item.title,
    date: item.date,
    technique: item.technique,
    description: item.description,
    height: item.height,
    width: item.width,
    length: isSculpture ? item.length : '',
    pictures: getFilenamesTab(item, type),
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

export const getFilenamesTab = (item, type) => {
  let tab = [];
  if (type === CONSTANT.SCULPTURE.TYPE) {
    let i;
    for (i = 1; i < 5; i++) {
      tab[i - 1] = `${item.title}_${i}.jpg`;
    }
  } else {
    tab[0] = `${item.title}.jpg`;
  }
  return tab;
};

export const getMainPaths = (item, type) => {
  const filenames = getFilenamesTab(item, type);
  const path = `${libraryPath}${getConst(type).IMAGE.PATH}`;

  return filenames.map((filename) => `${path}/${filename}`);
};

export const getMDPaths = (item, type) => {
  const filenames = getFilenamesTab(item, type);
  const path = `${libraryPath}${getConst(type).IMAGE.PATH_MD}`;

  return filenames.map((filename) => `${path}/${filename}`);
};

export const getSMPaths = (item, type) => {
  const filenames = getFilenamesTab(item, type);
  const path = `${libraryPath}${getConst(type).IMAGE.PATH_SM}`;

  return filenames.map((filename) => `${path}/${filename}`);
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