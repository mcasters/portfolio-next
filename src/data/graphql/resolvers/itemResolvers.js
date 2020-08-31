import ModelService from '../../lib/modelService';
import isAuthenticated from '../../lib/authUtils';
import { addImages, deleteItemImages, renameItemImages } from '../../lib/imageUtils';

export default {
  Query: {
    allItems: async (parent, { type }) => await new ModelService(type).getAllItems(),
    itemsByPart: async (parent, { type, year, part }) =>
      await new ModelService(type).getItemsByPart(year, part),
  },

  Mutation: {
    addItem: async (root, { item: { type, ...data } }, { req }) => {
      if (!(await isAuthenticated(req)))
        throw new Error("Erreur d'authentification");

      const { title } = data;
      const service = new ModelService(type);

      const item = await service.getByName(title);
      if (item) throw new Error("Nom de l'item déjà existant en Bdd");

      const res = await addImages(title, type);
      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      const newItem = await service.add(data, type);

      if (!newItem) {
        await deleteItemImages(title, type);
        throw new Error("Erreur à l'enregistrement en base de donnée");
      }
      return newItem;
    },

    updateItem: async (
      root,
      { item: { id, type, hasImages, ...data } },
      { req },
    ) => {
      if (!(await isAuthenticated(req)))
        throw new Error("Erreur d'authentification");

      const modelService = new ModelService(type);

      const oldItem = await modelService.getById(id);
      if (!oldItem) throw new Error('Item à modifier introuvable en BDD');

      const { title } = data;
      const itemByName = await modelService.getByName(title, type);
      if (itemByName && itemByName.id !== id)
        throw new Error("Nom d'item déjà existant en Bdd");

      const oldTitle = oldItem.title;
      if (hasImages) {
        const imageDeleted = await deleteItemImages(oldTitle, type);
        if (!imageDeleted)
          throw new Error(`Echec de la suppression des anciennes images`);

        const res = await addImages(title, type);
        if (!res) throw new Error("Erreur à l'écriture des nouveaux fichiers");
      } else if (oldTitle !== title) {
        const res = await renameItemImages(oldTitle, title, type);
        if (!res) throw new Error('Erreur au renommage des fichiers');
      }

      const updatedItem = await modelService.update(id, data);

      if (!updatedItem) {
        await deleteItemImages(title, type);
        throw new Error("Erreur à l'enregistrement en base de donnée");
      }

      return updatedItem;
    },

    deleteItem: async (root, { id, type }, { req }) => {
      if (!(await isAuthenticated(req)))
        throw new Error("Erreur d'authentification");

      const itemService = new ModelService(type);
      const item = await itemService.getById(id);
      if (!item) throw new Error('Item absent en BDD');

      const isDeleted = await deleteItemImages(item.title, type);

      if (!isDeleted) throw new Error(`Echec de la suppression des images`);
      else {
        const res = await itemService.delete(id);
        if (res) return true;
        else throw new Error('Echec de la suppression en Bdd');
      }
    },
  },
};
