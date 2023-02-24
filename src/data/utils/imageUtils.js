/*eslint-disable no-undef*/
import fs from 'fs';
import Jimp from 'jimp';

import ITEM from '../../constants/itemConstant';
import CONTENT from '../../constants/content';
import IMAGE from '../../constants/image';
import {
  getFilenamesTab,
  getMainPaths,
  getMDPaths,
  getSMPaths,
} from './itemUtils';

/****************
 * Entry point *
 ****************/
export const saveContentImage = async (title) => {
  const targetPath = getMiscellaneousPath(title);
  const tempPath = getTempPaths(title);

  const res = storeImage(tempPath, targetPath);

  if (!res) {
    deleteImage(targetPath);
  }

  deleteImage(tempPath);

  return res;
};

export const saveItemImages = async (item) => {
  const paths = getPaths(item);

  let res = true;
  try {
    paths.tempPaths.forEach((tempPath, i) => {
      storeImage(tempPath, paths.mainPaths[i]);
      storeImageWithResize(tempPath, paths.MDPaths[i], ITEM.MD_PX);
      storeImageWithResize(tempPath, paths.SMPaths[i], ITEM.SM_PX);
    });
  } catch (e) {
    deleteAllImages(paths);
    res = false;
  }
  return res;
};

/****************
 * Entry point *
 ****************/
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

/****************
 * Entry point *
 ****************/
export const deleteItemImages = async (title, type) => {
  return deleteAllImages(title, type);
};

const getTempPaths = (item) => {
  const tempPath = `${process.env.PHOTOS_PATH}${IMAGE.TEMP.PATH}`;
  const filenames = getFilenamesTab(item);

  return filenames.map((filename) => `${tempPath}/${filename}`);
};

const getPaths = (item) => {

  const serverLibraryPath = process.env.PHOTOS_PATH;
  const toServer = tab => {
    return tab.map(path => `${serverLibraryPath}${path}`)
  }

  return {
    tempPaths: getTempPaths(item),
    mainPaths: getMainPaths(item),
    MDPaths: getMDPaths(item),
    SMPaths: getSMPaths(item),
  };
};

const getMiscellaneousPath = (title) => {
  const libraryPath = process.env.PHOTOS_PATH;
  return `${libraryPath}${IMAGE.MISCELLANEOUS.PATH}/${title}.jpg`;
};

export const storeImage = (tempPath, targetPath) => {
  console.log(tempPath);
  console.log(targetPath);

  if (fs.existsSync(tempPath)) {
    try {
      fs.copyFileSync(tempPath, targetPath);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

const storeImageWithResize = (originalPath, targetPath, px) => {
  Jimp.read(`${originalPath}`, (err, img) => {
    if (err) return false;

    const isLandscape = img.getHeight() < img.getWidth();
    const width = isLandscape ? px : Jimp.AUTO;
    const height = isLandscape ? Jimp.AUTO : px;

    img.resize(width, height).quality(75).write(`${targetPath}`);
  });
  return true;
};

const renameItemImage = async (oldTitle, newTitle, type) => {
  const oldPaths = getItemPaths(oldTitle, type);
  const newPaths = getItemPaths(newTitle, type);

  return Promise.all(
    oldPaths.map((oldPath, index) => {
      if (fs.existsSync(oldPath)) {
        fs.rename(oldPath, newPaths[index], (err) => {
          return !err;
        });
      }
      return false;
    }),
  );
};

const deleteAllImages = (paths) => {
  paths.tempPaths.every(deleteImage);
  paths.mainPaths.every(deleteImage);
  paths.MDPaths.every(deleteImage);
  paths.SMPaths.every(deleteImage);
};

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(`${path}`);
  }
  return true;
};
