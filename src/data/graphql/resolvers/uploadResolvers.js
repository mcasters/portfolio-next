import { createWriteStream } from 'fs';

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject),
  );

export default {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
  },
};
