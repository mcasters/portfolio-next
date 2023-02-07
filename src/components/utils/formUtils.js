import {
  addItemRequest,
  addPictureRequest,
  saveFilesInTempRequest,
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

export const submitUpdateItem = async (item, type) => {
  if (!canSubmitData(item, type === CONSTANT.SCULPTURE.TYPE, true))
    return { error: 'Donnée(s) manquante(s)' };

  let hasImage = false;
  if (picturesIsFull(item)) {
    const { data, error } = await saveFilesInTempRequest(
      item.pictures,
      getFilenamesTab(item, type),
    );
    if (!data || error)
      return { error } || { error: "Erreur à l'upload du(des) fichier(s)" };
    hasImage = true;
  }
  return await updateItemRequest(getItemInputGraphql(item, type, hasImage));
};

export const submitAddItem = async (item, type) => {
  if (!canSubmitData(item, type === CONSTANT.SCULPTURE.TYPE, false))
    return { error: 'Donnée(s) manquante(s)' };
  const { data, error } = await saveFilesInTempRequest(
    item.pictures,
    getFilenamesTab(item, type),
  );
  if (!data || error)
    return { error } || { error: "Erreur à l'upload du(des) fichier(s)" };

  return await addItemRequest(getItemInputGraphql(item, type, true));
};

export const submitImageContent = async (title, file) => {
  const filename = `${title}.jpg`;

  const { data, error } = await saveFilesInTempRequest([file], [filename]);
  if (!data || error)
    return { error } || { error: "Erreur à l'upload du fichier" };

  return await addPictureRequest(title);
};
