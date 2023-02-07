import { isAuth } from '../../../components/utils/authUtils';
import fs from 'node:fs/promises';
import path from 'node:path';

// eslint-disable-next-line no-undef
const uploadDir = `${process.env.PHOTOS_PATH}/tmp`;

const fileResolvers = {
  // Upload file en temp dir

  Mutation: {
    // eslint-disable-next-line no-unused-vars
    saveFilesInTemp: async (_parent, { files, filenames }, context) => {
      if (!(await isAuth(context.req)))
        throw Error("Erreur d'authentification");
      for (const [i, file] of files.entries()) {
        const fileStream = file.stream();
        await fs.writeFile(path.join(`${uploadDir}`, filenames[i]), fileStream);
      }
      return true;
    },
  },
};

export default fileResolvers;
