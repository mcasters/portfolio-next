/*eslint-disable no-undef*/
import { rename, unlink, access, constants } from 'fs';
import sharp from 'sharp';

import ITEM from '../../constants/itemConstant';
import IMAGE from '../../constants/image';
import { filenamesTab, getConst } from '../../components/utils/itemUtils';
import CONTENT from '../../constants/content';

const serverLibraryPath = process.env.PHOTOS_PATH;

/****************
 * Entry point *
 ****************/
export const saveFiles = async (files, filenames, type) => {
  function exists(path) {
    access(path, constants.F_OK, (err) => !err);
  }

  const paths = getPaths(filenames, type);
  console.log(paths);
  if (type === CONTENT.TYPE) {
    return await storeImage(files[0], paths.contentPath, 0);
  }

  for (const [i, file] of files.entries()) {
    await storeImage(file, paths.mainPaths[i], 0);
    await storeImage(file, paths.MDPaths[i], ITEM.MD_PX);
    await storeImage(file, paths.SMPaths[i], ITEM.SM_PX);
  }
  return (
    (await paths.mainPaths.every(exists)) &&
    (await paths.MDPaths.every(exists)) &&
    (await paths.SMPaths.every(exists))
  );
};

export const renameItemImages = async (oldTitle, newTitle, type) => {
  const oldPaths = getPaths(filenamesTab(oldTitle, type), type);
  const newPaths = getPaths(filenamesTab(newTitle, type), type);

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
  const paths = getPaths(filenamesTab(title, type), type);

  return (
    paths.mainPaths.every(deleteImage) &&
    paths.MDPaths.every(deleteImage) &&
    paths.SMPaths.every(deleteImage)
  );
};

/****************
 * End entry point *
 ****************/

const storeImage = async (file, dest, px) => {
  const bufferFile = Buffer.from(await file.arrayBuffer());
  const image = sharp(bufferFile);

  return px === 0
    ? image
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: 'Marion Casters',
            },
          },
        })
        .webp({
          quality: 80,
        })
        .toFile(dest, (err) => !err)
    : image
        .resize(px, px, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: 'Marion Casters',
            },
          },
        })
        .webp({
          quality: 80,
        })
        .toFile(dest, (err) => !err);
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

const getMiscellaneousPath = (filenames) => {
  return `${serverLibraryPath}${IMAGE.MISCELLANEOUS.PATH}/${filenames[0]}`;
};

const getPaths = (filenames, type) => {
  return type === CONTENT.TYPE
    ? { contentPath: getMiscellaneousPath(filenames) }
    : {
        mainPaths: getMainPaths(filenames, type),
        MDPaths: getMDPaths(filenames, type),
        SMPaths: getSMPaths(filenames, type),
      };
};
