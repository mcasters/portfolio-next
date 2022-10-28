import {
  addItemRequest,
  updateItemRequest,
} from '../../data/request/request';
import ResultForm from '../../utils/ResultForm';
import { FORM_CONSTANT as CONST } from '../../constants/formConstant';

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

export async function uploadTempImages(filenames, pictures) {
  for (const [index, filename] of filenames.entries()) {
    const file = pictures[index];
    await fetch('/api/temp-image', {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'X-Filename': filename,
      },
      body: file,
    }).catch((e) => {
      throw e;
    });
  }
}

export const submitAddOrUpdateItem = async (itemObject, pictures, isUpdate) => {
  let result;
  const messageOk = isUpdate ? CONST.UPDATE.MESSAGE_OK : CONST.ADD.MESSAGE_OK;
  const messageKO = isUpdate ? CONST.UPDATE.MESSAGE_KO : CONST.ADD.MESSAGE_KO;
  try {
    if (picturesIsFull(pictures))
      await uploadTempImages(itemObject.filenames, pictures);

    const graphqlItem = itemObject.getGraphqlObject(isUpdate);

    const queryRes = isUpdate
      ? await updateItemRequest(graphqlItem)
      : await addItemRequest(graphqlItem);

    const { data, error } = queryRes;
    if (data)
      result = new ResultForm(`${itemObject.title} ${messageOk}`, false);
    else if (error) result = new ResultForm(error.message, true);
    else result = new ResultForm(messageKO, true);
  } catch (e) {
    result = new ResultForm(e.message, true);
  }
  return result;
};