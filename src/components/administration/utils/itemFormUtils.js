export const canSubmitData = (itemData, isSculpture) => {
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );

  const picturesOK = picturesIsFullOrEmpty(itemData.pictures, isSculpture);

  return (
    picturesOK &&
    ((!isSculpture && haveMain) ||
      !!(isSculpture && haveMain && itemData.length))
  );
};

export const picturesIsFullOrEmpty = (pictures, isSculpture) => {
  return picturesIsFull(pictures, isSculpture) || picturesIsEmpty(pictures);
};

export const picturesIsFull = (pictures, isSculpture) => {
  const full = (picture) => picture !== undefined && picture !== '';
  const sizeOk = isSculpture ? pictures.length === 4 : pictures.length === 1;
  return pictures.every(full) && sizeOk;
};

const picturesIsEmpty = (pictures) => {
  const empty = (picture) => picture === undefined || picture === '';
  return pictures.length === 0 || pictures.every(empty);
};

export async function uploadTempImages(itemData, isSculpture) {
  if (picturesIsFull(itemData.pictures, isSculpture)) {
    for (const [i, file] of itemData.pictures.entries()) {
      const filename = isSculpture
        ? `${itemData.title}_${i + 1}.jpg`
        : `${itemData.title}.jpg`;

      await fetch('/api/temp-image', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'X-Filename': filename,
        },
        body: file,
      }).catch((e) => {
        throw e
      });
    }
  }
}

export const getPreviewUrls = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => reader.result;
};
