import {
  addItemRequest,
  saveFilesRequest,
  updateItemRequest,
} from '../../data/request/request';
import CONSTANT from '../../constants/item';
import {
  filenamesTab,
  getInputGraphqlObject,
  picturesIsFull,
  picturesIsFullOrEmpty,
} from './itemUtils';
import CONTENT from '../../constants/content';

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

export const submitAddItem = async (itemObject) => {
  if (!canSubmitData(itemObject, false))
    return { error: 'Donnée(s) manquante(s)' };

  const { data, error } = await saveFilesRequest(
    itemObject.pictures,
    filenamesTab(itemObject.title, itemObject.type),
    itemObject.type,
  );

  return error || !data?.saveFiles
    ? { error } || { error: "Erreur à l'upload du(des) fichier(s)" }
    : await addItemRequest(getInputGraphqlObject(itemObject, true));
};
export const submitUpdateItem = async (itemObject) => {
  if (!canSubmitData(itemObject, true))
    return { error: 'Donnée(s) manquante(s)' };

  let hasImage = false;
  if (picturesIsFull(itemObject)) {
    const { data, error } = await saveFilesRequest(
      itemObject.pictures,
      filenamesTab(itemObject.title, itemObject.type),
      itemObject.type,
    );
    if (error || !data?.saveFiles)
      return { error } || { error: "Erreur à l'upload du(des) fichier(s)" };
    hasImage = true;
  }
  return await updateItemRequest(getInputGraphqlObject(itemObject, hasImage));
};

export const submitImageContent = async (title, file) => {
  return await saveFilesRequest([file], [`${title}.jpg`], CONTENT.TYPE);
};
