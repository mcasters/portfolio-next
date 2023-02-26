import { isAuth } from '../../../components/utils/authUtils';
import { saveFiles } from '../../utils/imageUtils';

const fileResolvers = {
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    saveFiles: async (_parent, { files, filenames, type }, context) => {
      if (!(await isAuth(context.req)))
        throw Error("Erreur d'authentification");

      const res = saveFiles(files, filenames, type);
      if (!res) throw Error("Erreur à l'upload du(des) fichier(s)");
      return true;
    },
  },
};

export default fileResolvers;
