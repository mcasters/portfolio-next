import CONSTANT from '../../../constants/itemConstant';

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
    date: '',
    technique: '',
    description: '',
    height: '',
    width: '',
    length: '',
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