import CONSTANT from '../../constants/itemConstant';
import ITEM from '../../constants/itemConstant';

const libraryPath = '/images';

export const getInputGraphqlObject = (itemObject, hasImages) => {
  return {
    type: itemObject.type,
    id: itemObject.id ? itemObject.id : undefined,
    title: itemObject.title,
    date: itemObject.date,
    technique: itemObject.technique,
    description: itemObject.description,
    height: itemObject.height,
    width: itemObject.width,
    length: itemObject.length,
    hasImages,
  };
};

export const getEmptyItemObject = (type) => {
  const isSculpture = type === ITEM.SCULPTURE.TYPE;
  return {
    id: '',
    type,
    title: '',
    date: new Date(),
    technique: '',
    description: '',
    height: '',
    width: '',
    length: isSculpture ? '' : undefined,
    pictures: isSculpture ? ['', '', '', ''] : [''],
    alt: getAltImage(type),
    SMPaths: '',
    MDPaths: '',
    LGPaths: ',',
  };
};

export const getItemObject = (graphQLObject, type) => {
  const { date, ...rest } = graphQLObject;
  const paths = getPaths(graphQLObject, type);
  return {
    date: new Date(date),
    ...rest,
    type,
    alt: getAltImage(type),
    ...paths,
    pictures: type === CONSTANT.SCULPTURE.TYPE ? ['', '', '', ''] : [''],
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

export const filenamesTab = (title, type) => {
  let tab = [];
  if (type === CONSTANT.SCULPTURE.TYPE) {
    let i;
    for (i = 1; i < 5; i++) {
      tab[i - 1] = `${title}_${i}.jpg`;
    }
  } else {
    tab[0] = `${title}.jpg`;
  }
  return tab;
};

export const getMainPaths = (filenames, type) => {
  const path = `${libraryPath}${getConst(type).IMAGE.PATH}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

export const getMDPaths = (filenames, type) => {
  const path = `${libraryPath}${getConst(type).IMAGE.PATH_MD}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

export const getSMPaths = (filenames, type) => {
  const path = `${libraryPath}${getConst(type).IMAGE.PATH_SM}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

const getPaths = (graphQLObject, type) => {
  const filenames = filenamesTab(graphQLObject.title, type);
  return {
    SMPaths: getSMPaths(filenames, type),
    MDPaths: getMDPaths(filenames, type),
    LGPaths: getMainPaths(filenames, type),
  };
};

export const getConst = (type) => {
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

export const getAltImage = (type) => {
  switch (type) {
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
