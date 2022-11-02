import { addItemRequest, updateItemRequest } from '../../data/request/request';
import CONSTANT from '../../constants/itemConstant';
import {
  getFilenamesTab,
  getGraphqlObject,
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
  // TODO
};

export const submitAddItem = async (item, type) => {
  let resultUpload;

  if (picturesIsFull(item)) {
    resultUpload = await uploadImage(
      getFilenamesTab(item, type),
      item.pictures,
    );
  } else {
    resultUpload = Object.assign({}, { error: 'Image(s) manquante(s)' });
  }
  if (resultUpload.error) return resultUpload;

  return await addItemRequest(getGraphqlObject(item, type));
};