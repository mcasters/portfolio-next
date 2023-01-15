import {
  addItemRequest,
  updateItemRequest,
} from '../../data/request/request';
import CONSTANT from '../../constants/itemConstant';
import {
  getFilenamesTab,
  getItemInputGraphql,
  picturesIsFull,
  picturesIsFullOrEmpty,
} from './itemUtils';

export const canSubmitData = (item, isSculpture, isUpdate) => {
  const haveMain = !!(
    item.title &&
    item.date &&
    item.technique &&
    item.height &&
    item.width
  );

  const picturesOK = isUpdate
    ? picturesIsFullOrEmpty(item)
    : picturesIsFull(item);

  return (
    picturesOK &&
    ((!isSculpture && haveMain) || !!(isSculpture && haveMain && item.length))
  );
};

const uploadImage = async (filenames, pictures) => {
  try {
    let formData = new FormData();
    pictures.forEach((file, index) => {
      formData.append(filenames[index], file);
    });

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    return await res.json();
  } catch (e) {
    return Object.assign({}, { error: 'Error uploading files' });
  }
};

export const submitUpdateItem = async (item, type) => {

  if (!canSubmitData(item, type === CONSTANT.SCULPTURE.TYPE, true))
    return Object.assign({}, { error: 'Donnée(s) manquante(s)' });

  let hasImages = false;
  if (picturesIsFull(item)) {
    const resultUpload = await uploadImage(
      getFilenamesTab(item, type),
      item.pictures,
    );
    if (resultUpload.error) return resultUpload;
    hasImages = true;
  }
  return await updateItemRequest(getItemInputGraphql(item, type, hasImages));
};

export const submitAddItem = async (item, type) => {
  if (!canSubmitData(item, type === CONSTANT.SCULPTURE.TYPE, false))
    return Object.assign({}, { error: 'Donnée(s) manquante(s)' });

  const resultUpload = await uploadImage(
    getFilenamesTab(item, type),
    item.pictures,
  );
  if (resultUpload.error) return resultUpload;

  return await addItemRequest(getItemInputGraphql(item, type, true));
};