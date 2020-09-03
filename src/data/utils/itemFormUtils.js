export const canSubmitData = (itemData, isSculpture) => {
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );

  const picturesOK = picturesIsFullOrEmpty(itemData.pictures);

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
