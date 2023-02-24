import { isAuth } from '../../../components/utils/authUtils';
import { saveFilesInTmp } from '../../utils/imageUtils';

const fileResolvers = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    saveFilesInTemp: async (_parent, { files, filenames }, context) => {
      if (!(await isAuth(context.req)))
        throw Error("Erreur d'authentification");

      const res = saveFilesInTmp(files, filenames);
      if (!res) throw Error("Erreur à l'upload du(des) fichier(s)");
      return true;
    },
  },
};

export default fileResolvers;
