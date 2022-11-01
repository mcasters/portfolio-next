import { addItemRequest, updateItemRequest } from '../../data/request/request';
import CONSTANT from '../../constants/itemConstant';

export const canSubmitData = (itemData, isSculpture, isUpdate) => {
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );

  const picturesOK = isUpdate
    ? picturesIsFullOrEmpty(itemData.pictures)
    : picturesIsFull(itemData.pictures);

  return (
    picturesOK &&
    ((!isSculpture && haveMain) ||
      !!(isSculpture && haveMain && itemData.length))
  );
};

export const picturesIsFullOrEmpty = (pictures) => {
  return picturesIsFull(pictures) || picturesIsEmpty(pictures);
};

export const picturesIsFull = (pictures) => {
  const full = (picture) => picture !== '';
  return pictures.every(full);
};

export const picturesIsEmpty = (pictures) => {
  const empty = (picture) => picture === '';
  return pictures.every(empty);
};

const uploadImage = async (filenames, pictures) => {
  try {
    let formData = new FormData();
    pictures.forEach((file) => {
      formData.append(CONSTANT.UPLOAD_NAME, file);
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

export const submitAddOrUpdateItem = async (itemObject, pictures, isUpdate) => {
  const graphqlItem = itemObject.getGraphqlObject(isUpdate);

  let resultUpload;

  if (picturesIsFull(pictures))
    resultUpload = await uploadImage(itemObject.filenames, pictures);

  if (resultUpload.error) return resultUpload;

  const result = isUpdate
    ? await updateItemRequest(graphqlItem)
    : await addItemRequest(graphqlItem);

  console.log('//// result : ', result);
  return result;
};