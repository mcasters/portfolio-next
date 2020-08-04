import fs from 'fs';
import Jimp from 'jimp';

import ITEM from '../../constants/itemConstant';
import CONTENT from '../../constants/content';
import IMAGE from '../../constants/image';

const getTempPath = title => {
  const libraryPath = process.env.NEXT_PUBLIC_PHOTOS_PATH;
  const file = `${title}.jpg`;
  return `${libraryPath}${IMAGE.TEMP.PATH}/${file}`;
};

const getSculpturePaths = title => {
  const libraryPath = process.env.NEXT_PUBLIC_PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.SCULPTURE.PATH}/${file}`,
    `${libraryPath}${IMAGE.SCULPTURE.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.SCULPTURE.PATH_SM}/${file}`,
  ];
};
const getPaintingPaths = title => {
  const libraryPath = process.env.NEXT_PUBLIC_PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.PAINTING.PATH}/${file}`,
    `${libraryPath}${IMAGE.PAINTING.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.PAINTING.PATH_SM}/${file}`,
  ];
};

const getDrawingPaths = title => {
  const libraryPath = process.env.NEXT_PUBLIC_PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.DRAWING.PATH}/${file}`,
    `${libraryPath}${IMAGE.DRAWING.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.DRAWING.PATH_SM}/${file}`,
  ];
};

const getItemPaths = (title, type) => {
  switch (type) {
    case ITEM.SCULPTURE.TYPE: {
      return getSculpturePaths(title);
    }
    case ITEM.PAINTING.TYPE: {
      return getPaintingPaths(title);
    }
    case ITEM.DRAWING.TYPE: {
      return getDrawingPaths(title);
    }
    default: {
      return;
    }
  }
};

const getMiscellaneousPath = title => {
  const libraryPath = process.env.NEXT_PUBLIC_PHOTOS_PATH;
  return `${libraryPath}${IMAGE.MISCELLANEOUS.PATH}/${title}.jpg`;
};

const getSculptureTitlesWithIndex = title => {
  const tab = [];
  let i;
  for (i = 1; i < 5; i++) {
    tab.push(`${title}_${i}`);
  }
  return tab;
};

export const storeImage = (tempPath, targetPath) => {
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

    img
      .resize(width, height)
      .quality(75)
      .write(`${targetPath}`);
  });
  return true;
};

const storeAllSizeImages = (title, type) => {
  const paths = getItemPaths(title, type);
  const imageTarget = paths[0];
  const mdImageTarget = paths[1];
  const smImageTarget = paths[2];

  const tempPath = getTempPath(title);

  let originalSaved = storeImage(tempPath, imageTarget);
  let res = false;

  if (originalSaved) {
    try {
      res =
        storeImageWithResize(imageTarget, mdImageTarget, ITEM.MD_PX) &&
        storeImageWithResize(imageTarget, smImageTarget, ITEM.SM_PX);
    } catch (e) {
      return false;
    }
  }
  return res;
};

const storeItemImages = async (pTitle, type) => {
  const tabTitles =
    type === ITEM.SCULPTURE.TYPE
      ? getSculptureTitlesWithIndex(pTitle)
      : [pTitle];
  let res = true;

  tabTitles.forEach(title => {
    if (res) {
      res = storeAllSizeImages(title, type);
    } else {
      res = false;
    }
  });

  if (!res) {
    tabTitles.forEach(title => {
      deleteAllSizeImages(title, type);
    });
  }

  tabTitles.forEach(title => {
    const tempFile = getTempPath(title);
    deleteImage(tempFile);
  });

  return res;
};

const storeContentImage = async title => {
  const targetPath = getMiscellaneousPath(title);
  const tempPath = getTempPath(title);

  const res = storeImage(tempPath, targetPath);

  if (!res) {
    deleteImage(targetPath);
  }

  deleteImage(tempPath);

  return res;
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

const deleteAllSizeImages = (title, type) => {
  let paths = [];
  if (type === ITEM.SCULPTURE.TYPE) {
    const titlesIndex = getSculptureTitlesWithIndex(title);
    titlesIndex.forEach(titleIndex => {
      const pathsIndex = getItemPaths(titleIndex, type);
      pathsIndex.forEach(pathIndex => {
        paths.push(pathIndex);
      });
    });
  } else {
    paths = getItemPaths(title, type);
  }
  return paths.every(deleteImage);
};

const deleteImage = path => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(`${path}`);
  }
  return true;
};

/****************
 * Entry point *
 ****************/
export const addItemImages = (title, type) => {
  if (type === CONTENT.TYPE) {
    return storeContentImage(title);
  } else {
    return storeItemImages(title, type);
  }
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
  return deleteAllSizeImages(title, type);
};
