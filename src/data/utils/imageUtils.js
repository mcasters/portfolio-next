/*eslint-disable no-undef*/
import { existsSync, copyFile, rename, unlink, access, constants } from 'fs';
import { writeFile } from 'node:fs/promises';
import Jimp from 'jimp';

import ITEM from '../../constants/itemConstant';
import IMAGE from '../../constants/image';
import { filenamesTab, getConst } from '../../components/utils/itemUtils';

const serverLibraryPath = process.env.PHOTOS_PATH;

/****************
 * Entry point *
 ****************/
export const saveFilesInTmp = async (files, filenames) => {
  const tempPaths = getTempPaths(filenames);

  for (const [i, file] of files.entries()) {
    const readableStream = file.stream();
    await writeFile(tempPaths[i], readableStream);
  }
  function exists(path) {
    access(path, constants.F_OK, (err) => !err);
  }
  return tempPaths.every(exists);
};

export const saveItemImages = async (graphqlInputObject) => {
  const paths = getPaths(graphqlInputObject.title, graphqlInputObject.type);
  let res = true;

  for (const [i, tempPath] of paths.tempPaths.entries()) {
    res =
      storeImage(tempPath, paths.mainPaths[i]) &&
      storeImageWithResize(tempPath, paths.MDPaths[i], ITEM.MD_PX) &&
      storeImageWithResize(tempPath, paths.SMPaths[i], ITEM.SM_PX);
  }
  if (!res)
    deleteAllImages(graphqlInputObject.title, graphqlInputObject.type, true);
  else paths.tempPaths.every(deleteImage);
  return res;
};

export const saveContentImage = async (title) => {
  const targetPath = getMiscellaneousPath(title);
  const tempPath = getTempPaths([`${title}.jpg`])[0];
  const res = storeImage(tempPath, targetPath);
  deleteImage(tempPath);
  return res;
};

export const renameItemImages = async (oldTitle, newTitle, type) => {
  const oldPaths = getPaths(oldTitle, type);
  const newPaths = getPaths(newTitle, type);

  const promises = [];
  oldPaths.mainPaths.forEach((oldPath, i) => {
    promises.push(renameItemImage(oldPath, newPaths.mainPaths[i]));
  });
  oldPaths.MDPaths.forEach((oldPath, i) => {
    promises.push(renameItemImage(oldPath, newPaths.MDPaths[i]));
  });
  oldPaths.SMPaths.forEach((oldPath, i) => {
    promises.push(renameItemImage(oldPath, newPaths.SMPaths[i]));
  });
  return Promise.all(promises);
};

export const deleteItemImages = (title, type) => {
  return deleteAllImages(title, type, false);
};

/****************
 * End entry point *
 ****************/

export const storeImage = async (source, dest) => {
  copyFile(source, dest, (err) => {
    return !err;
  });
  return true;
};

const storeImageWithResize = async (originalPath, targetPath, px) => {
  await Jimp.read(`${originalPath}`, (err, img) => {
    if (err) return false;
    const isLandscape = img.getHeight() < img.getWidth();
    const width = isLandscape ? px : Jimp.AUTO;
    const height = isLandscape ? Jimp.AUTO : px;
    img.resize(width, height).quality(75).write(`${targetPath}`);
  });
  return true;
};

const renameItemImage = async (oldPath, newPath) => {
  access(oldPath, constants.F_OK, (err) => {
    if (err) return false;
    rename(oldPath, newPath, (err) => {
      return !err;
    });
  });
  return false;
};

const deleteImage = (path) => {
  unlink(`${path}`, (err) => {
    if (err) return false;
  });
  return true;
};

const deleteAllImages = (title, type, withTempDir) => {
  const paths = getPaths(title, type);

  const res = withTempDir ? paths.tempPaths.every(deleteImage) : true;
  return (
    res &&
    paths.mainPaths.every(deleteImage) &&
    paths.MDPaths.every(deleteImage) &&
    paths.SMPaths.every(deleteImage)
  );
};

const getTempPaths = (filenames) => {
  const tempPath = `${serverLibraryPath}${IMAGE.TEMP.PATH}`;
  return filenames.map((filename) => `${tempPath}/${filename}`);
};

const getSMPaths = (filenames, type) => {
  const path = `${serverLibraryPath}${getConst(type).IMAGE.PATH_SM}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

const getMDPaths = (filenames, type) => {
  const path = `${serverLibraryPath}${getConst(type).IMAGE.PATH_MD}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

const getMainPaths = (filenames, type) => {
  const typeUpper = type.toUpperCase();
  const path = `${serverLibraryPath}${ITEM[typeUpper].IMAGE.PATH}`;
  return filenames.map((filename) => `${path}/${filename}`);
};

const getPaths = (title, type) => {
  const filenames = filenamesTab(title, type);
  return {
    tempPaths: getTempPaths(filenames, type),
    mainPaths: getMainPaths(filenames, type),
    MDPaths: getMDPaths(filenames, type),
    SMPaths: getSMPaths(filenames, type),
  };
};

const getMiscellaneousPath = (title) => {
  const libraryPath = process.env.PHOTOS_PATH;
  return `${libraryPath}${IMAGE.MISCELLANEOUS.PATH}/${title}.jpg`;
};
