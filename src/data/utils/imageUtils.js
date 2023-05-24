/*eslint-disable no-undef*/
import { rename, unlink, access, constants } from 'fs';
import sharp from 'sharp';

import ITEM from '../../constants/item';
import IMAGE from '../../constants/image';
import { filenamesTab, getConst } from '../../components/utils/itemUtils';
import CONTENT from '../../constants/content';

const serverLibraryPath = process.env.PHOTOS_PATH;

/****************
 * Entry point *
 ****************/

export const saveFiles = async (files, filenames, type) => {
  if (type === CONTENT.TYPE) {
    return await storeImage(files[0], getMiscellaneousPath(filenames[0]), 2000);
  } else {
    return await storeItemImages(files, getPaths(filenames, type));
  }
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

const saveAndResize = (promises, sharpStream, paths, i) => {
  promises.push(
    sharpStream
      .clone()
      .resize(ITEM.MAX_PX, ITEM.MAX_PX, {
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
      .jpeg({ quality: 80 })
      .toFile(paths.mainPaths[i]),
  );

  promises.push(
    sharpStream
      .clone()
      .resize(ITEM.MD_PX, ITEM.MD_PX, {
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
      .jpeg({
        quality: 80,
      })
      .toFile(paths.MDPaths[i]),
  );

  promises.push(
    sharpStream
      .clone()
      .resize(ITEM.SM_PX, ITEM.SM_PX, {
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
      .jpeg({
        quality: 80,
      })
      .toFile(paths.SMPaths[i]),
  );
};

const storeItemImages = async (files, paths) => {
  const promises = [];

  for (const [i, file] of files.entries()) {
    const bufferFile = Buffer.from(await file.arrayBuffer());
    const sharpStream = sharp(bufferFile);
    saveAndResize(promises, sharpStream, paths, i);
  }

  Promise.all(promises)
    .then((res) => {
      console.log('Done!', res);
    })
    .catch((err) => {
      console.error("Error processing files, let's clean it up", err);
      try {
        paths.mainPaths.every(deleteImage);
        paths.MDPaths.every(deleteImage);
        paths.SMPaths.every(deleteImage);
      } catch (e) {}
    });
};

const storeImage = async (file, dest, px) => {
  const bufferFile = Buffer.from(await file.arrayBuffer());
  const sharpStream = sharp(bufferFile);

  return px === 0
    ? sharpStream
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: 'Marion Casters',
            },
          },
        })
        .jpeg({
          quality: 80,
        })
        .toFile(dest, (err) => !err)
    : sharpStream
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
        .jpeg({
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

const getMiscellaneousPath = (filename) => {
  return `${serverLibraryPath}${IMAGE.MISCELLANEOUS.PATH}/${filename}`;
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
