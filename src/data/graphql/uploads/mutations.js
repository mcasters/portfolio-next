/* eslint-disable spaced-comment */
import { createWriteStream } from 'fs';

export const types = [];

export const mutations = [
  `
  singleUpload(file: Upload!): Boolean
`,
];

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject),
  );

export const resolvers = {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
  },
};
