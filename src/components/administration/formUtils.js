import { addItemRequest, updateItemRequest } from '../../data/request/request';

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
  const result = { data: null, error: null };

  const formData = new FormData();

  for (const [index, filename] of filenames.entries()) {
    const file = pictures[index];
    formData.append(filename, file);
    result.data += `${filename} uploaded `;
  }
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  console.log('///// res  : ', res);

  if (!res.ok) return Object.assign(result, { error: 'Error uploading files' });

  return result;
}

export const submitAddOrUpdateItem = async (itemObject, pictures, isUpdate) => {
  const graphqlItem = itemObject.getGraphqlObject(isUpdate);

  let resultUpload;

  // if (picturesIsFull(pictures))
  //   resultUpload = await uploadTempImages(itemObject.filenames, pictures);

  return resultUpload.error
    ? resultUpload
    : Object.assign(
        {},
        {
          data: isUpdate
            ? await updateItemRequest(graphqlItem)
            : await addItemRequest(graphqlItem),
        },
      );
};