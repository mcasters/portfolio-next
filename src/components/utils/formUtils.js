import {
  addItemRequest,
  addPictureRequest,
  saveFilesInTempRequest,
  updateItemRequest,
} from '../../data/request/request';
import CONSTANT from '../../constants/itemConstant';
import {
  filenamesTab,
  getInputGraphqlObject,
  picturesIsFull,
  picturesIsFullOrEmpty,
} from './itemUtils';

export const canSubmitData = (itemObject, isUpdate) => {
  const isSculpture = itemObject.type === CONSTANT.SCULPTURE.TYPE;
  const haveMain = !!(
    itemObject.title &&
    itemObject.date &&
    itemObject.technique &&
    itemObject.height &&
    itemObject.width
  );

  const picturesOK = isUpdate
    ? picturesIsFullOrEmpty(itemObject)
    : picturesIsFull(itemObject);

  return (
    picturesOK &&
    ((!isSculpture && haveMain) ||
      !!(isSculpture && haveMain && itemObject.length))
  );
};

export const submitUpdateItem = async (itemObject) => {
  if (!canSubmitData(itemObject, true))
    return { error: 'Donnée(s) manquante(s)' };

  let hasImage = false;
  if (picturesIsFull(itemObject)) {
    const { data, error } = await saveFilesInTempRequest(
      itemObject.pictures,
      filenamesTab(itemObject.title, itemObject.type),
    );
    if (!data.saveFilesInTemp || error)
      return { error } || { error: "Erreur à l'upload du(des) fichier(s)" };
    hasImage = true;
  }
  return await updateItemRequest(getInputGraphqlObject(itemObject, hasImage));
};

export const submitAddItem = async (itemObject) => {
  if (!canSubmitData(itemObject, false))
    return { error: 'Donnée(s) manquante(s)' };

  const { data, error } = await saveFilesInTempRequest(
    itemObject.pictures,
    filenamesTab(itemObject.title, itemObject.type),
  );

  return error || !data.saveFilesInTemp
    ? { error } || { error: "Erreur à l'upload du(des) fichier(s)" }
    : await addItemRequest(getInputGraphqlObject(itemObject, true));
};

export const submitImageContent = async (title, file) => {
  const { data, error } = await saveFilesInTempRequest([file], [`${title}.jpg`]);
  return error || !data.saveFilesInTemp
    ? { error } || { error: "Erreur à l'upload du fichier" }
    : await addPictureRequest(title);
};
