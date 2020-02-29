import fs from 'fs';
import Jimp from 'jimp';

import config from '../../../next.config';
import ITEM from '../../constants/item';
import CONTENT from '../../constants/content';

export const getAllImages = async dirPath => {
  const images = [];
  const files = fs.readdir(dirPath);

  files.forEach(file => {
    images.push(file);
  });
  return images;
};

const getItemPaths = (title, type) => {
  const file = `${title}.jpg`;
  if (type === ITEM.SCULPTURE.TYPE)
    return [
      `${config.sculpturesPath}/${file}`,
      `${config.sculpturesMDPath}/${file}`,
      `${config.sculpturesSMPath}/${file}`,
    ];

  if (type === ITEM.DRAWING.TYPE)
    return [
      `${config.drawingsPath}/${file}`,
      `${config.drawingsMDPath}/${file}`,
      `${config.drawingsSMPath}/${file}`,
    ];

  if (type === ITEM.PAINTING.TYPE)
    return [
      `${config.paintingsPath}/${file}`,
      `${config.paintingsMDPath}/${file}`,
      `${config.paintingsSMPath}/${file}`,
    ];
  return null;
};

export const storeImage = async (file, path) => {
  const { stream } = await file;
  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .on('finish', () => {
        resolve(true);
      }),
  );
};

const storeImageWithResize = (path, targetPath, px) => {
  return new Promise((resolve, reject) =>
    Jimp.read(path, (err, img) => {
      if (err) reject(err);

      const isLandscape = img.getHeight() < img.getWidth();
      const width = isLandscape ? px : Jimp.AUTO;
      const height = isLandscape ? Jimp.AUTO : px;

      img
        .resize(width, height)
        .quality(75)
        .write(targetPath);
      resolve(true);
    }),
  );
};

const storeItemImage = async (file, type, title) => {
  const paths = getItemPaths(title, type);

  return Promise.all([
    await storeImage(file, paths[0]),
    storeImageWithResize(paths[0], paths[1], ITEM.MD_PX),
    storeImageWithResize(paths[0], paths[2], ITEM.SM_PX),
  ]);
};

const processSculptureImagesUpload = async (pictures, title) => {
  const process = (file, index) => {
    const titleWithIndex = `${title}_${index + 1}`;
    return storeItemImage(file, ITEM.SCULPTURE.TYPE, titleWithIndex);
  };

  return Promise.all(pictures.map(process));
};

const renameItemImage = async (oldTitle, newTitle, type) => {
  const oldPaths = getItemPaths(oldTitle, type);
  const newPaths = getItemPaths(newTitle, type);

  return Promise.all(
    oldPaths.map((oldPath, index) => {
      if (fs.existsSync(oldPath)) {
        fs.rename(oldPath, newPaths[index], err => {
          return !err;
        });
      }
      return false;
    }),
  );
};

const deleteImage = async file => {
  fs.unlink(`${file}`, err => {
    return !err;
  });
};

/*
 * Entry point
 */
export const processImageUpload = async (pictures, title, type) => {
  if (type === ITEM.SCULPTURE.TYPE) {
    return processSculptureImagesUpload(pictures, title);
  }

  const file = await pictures[0];
  if (type === CONTENT.TYPE) {
    const path = `${config.miscellaneousPath}/${title}.jpg`;
    return storeImage(file, path);
  }
  return storeItemImage(file, type, title);
};

/*
 * Entry point
 */
export const renameItemImages = async (oldTitle, newTitle, type) => {
  if (type === ITEM.SCULPTURE.TYPE) {
    let i = 1;
    const promises = [];

    while (i < 5) {
      const oldFileName = `${oldTitle}_${i}`;
      const newFileName = `${newTitle}_${i}`;
      promises.push(renameItemImage(oldFileName, newFileName, type));
      i++;
    }
    return Promise.all(promises);
  }
  return renameItemImage(oldTitle, newTitle, type);
};

/*
 * Entry point
 */
export const deleteItemImages = async (title, type) => {
  let paths;

  if (type === ITEM.SCULPTURE.TYPE) {
    let i;
    paths = [];
    for (i = 1; i < 5; i++) {
      Array.prototype.push.apply(paths, getItemPaths(`${title}_${i}`, type));
    }
  } else {
    paths = getItemPaths(title, type);
  }

  const isDeleted = await paths.every(deleteImage);
  return isDeleted;
};
