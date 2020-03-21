import fs from 'fs';
import Jimp from 'jimp';

import ITEM from '../../constants/item';
import CONTENT from '../../constants/content';
import IMAGE from '../../constants/image';

const getSculpturePaths = title => {
  const libraryPath = process.env.PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.SCULPTURE.PATH}/${file}`,
    `${libraryPath}${IMAGE.SCULPTURE.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.SCULPTURE.PATH_SM}/${file}`,
  ];
};
const getPaintingPaths = title => {
  const libraryPath = process.env.PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.PAINTING.PATH}/${file}`,
    `${libraryPath}${IMAGE.PAINTING.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.PAINTING.PATH_SM}/${file}`,
  ];
};

const getDrawingPaths = title => {
  const libraryPath = process.env.PHOTOS_PATH;
  const file = `${title}.jpg`;
  return [
    `${libraryPath}${IMAGE.DRAWING.PATH}/${file}`,
    `${libraryPath}${IMAGE.DRAWING.PATH_MD}/${file}`,
    `${libraryPath}${IMAGE.DRAWING.PATH_SM}/${file}`,
  ];
};

const getMiscellaneousPath = title => {
  const libraryPath = process.env.PHOTOS_PATH;
  return `${libraryPath}${IMAGE.MISCELLANEOUS.PATH}/${title}.jpg`;
}

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

export const storeImage = async (upload, targetPath) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = { filename, mimetype, targetPath };

  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path);

    writeStream.on('finish', resolve);
    writeStream.on('error', error => {
      fs.unlink(path, () => {
        reject(error);
      });
    });
    stream.on('error', error => writeStream.destroy(error));
    stream.pipe(writeStream);
  });

  return file;
};

const storeImageWithResize = (originalPath, targetPath, px) => {
  return new Promise((resolve, reject) =>
    Jimp.read(originalPath, (err, img) => {
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

const storeItemImages = async (file, type, title) => {
  const paths = getItemPaths(title, type);
  const originalImage = paths[0];
  const mdImage = paths[1];
  const smImage = paths[2];

  return Promise.all([
    await storeImage(file, originalImage),
    storeImageWithResize(originalImage, mdImage, ITEM.MD_PX),
    storeImageWithResize(originalImage, smImage, ITEM.SM_PX),
  ]);
};

const storeSculptureImages = async (pictures, title) => {
  const process = (file, index) => {
    const titleWithIndex = `${title}_${index + 1}`;
    return storeItemImages(file, ITEM.SCULPTURE.TYPE, titleWithIndex);
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
export const addItemImages = async (pictures, title, type) => {
  let file;
  if (type !== ITEM.SCULPTURE.TYPE) file = await pictures[0];

  switch (type) {
    case ITEM.SCULPTURE.TYPE: {
      return storeSculptureImages(pictures, title);
    }
    case ITEM.PAINTING.TYPE || ITEM.DRAWING.TYPE: {
      return storeItemImages(file, type, title);
    }
    case CONTENT.TYPE: {
      const targetPath = getMiscellaneousPath(title);
      return storeImage(file, targetPath);
    }
    default: {
      return;
    }
  }
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
  return paths.every(deleteImage);
};
