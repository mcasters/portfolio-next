export const canSubmitData = (itemData) => {
  const isSculpture = itemData.isSculpture;
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );

  const picturesToCheck = itemData.pictures.length > 0;
  const picturesOK = picturesToCheck
    ? (isSculpture && itemData.pictures.length === 4) ||
      (!itemData.isSculpture && itemData.pictures.length === 1)
    : true;

  return (
    picturesOK &&
    ((!itemData.isSculpture && haveMain) ||
      !!(itemData.isSculpture && haveMain && itemData.length))
  );
};

export async function uploadTempImages(itemData) {
    let i = 1;
    for (const file of itemData.pictures) {
      const filename = itemData.isSculpture
        ? `${itemData.title}_${i}.jpg`
        : `${itemData.title}.jpg`;

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
      i++;
    }
}

export const getImagePreviewUrls = async (imagePreviewUrls, file, index) => {
  const copy = imagePreviewUrls;
  const reader = new FileReader();
  reader.onload = () => {
    copy.splice(index, 1, reader.result);
  };
  await reader.readAsDataURL(file);
  return copy;
};
