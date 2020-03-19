import ItemModelService from '../services/ItemModelService';
import isAuthenticated from '../services/authService';
import * as imageService from '../../image/imageServices';

export default {
  Query: {
    getAllItems: async (parent, { type }) =>
      new ItemModelService(type).getAllItems(),
    getItemsByPart: (parent, { type, year, half }) =>
      new ItemModelService(type).getItemsByPart(year, half),
  },

  Mutation: {
    addItem: async (root, { input: { pictures, type, ...data } }, { req }) => {
      if (!await isAuthenticated(req)) throw new Error("Erreur d'authentification");

      const { title } = data;
      const itemService = new ItemModelService(type);

      const item = await itemService.getByName(title);
      if (item) throw new Error("Nom de l'item déjà existant en Bdd");

      const res = await imageService.processImageUpload(pictures, title, type);
      if (!res) throw new Error("Erreur à l'écriture des fichiers");

      const newItem = await itemService.add(data, type);

      if (!newItem) {
        await imageService.deleteItemImages(title, type);
        throw new Error("Erreur à l'enregistrement en base de donnée");
      }
      return newItem;
    },

    updateItem: async (
      root,
      { id, input: { pictures, type, ...data } },
      { req },
    ) => {
      if (!await isAuthenticated(req)) throw new Error("Erreur d'authentification");

      const itemService = new ItemModelService(type);

      const oldItem = await itemService.getById(id);
      if (!oldItem) throw new Error('Item à modifier introuvable en BDD');

      const { title } = data;
      const itemByName = await itemService.getByName(title, type);
      if (itemByName && itemByName.id !== id)
        throw new Error("Nom d'item déjà existant en Bdd");

      const oldTitle = oldItem.title;
      if (pictures.length > 0) {
        const imageDeleted = await imageService.deleteItemImages(
          oldTitle,
          type,
        );

        if (!imageDeleted)
          throw new Error(`Echec de la suppression des anciennes images`);

        const res = await imageService.processImageUpload(
          pictures,
          title,
          type,
        );
        if (!res) throw new Error("Erreur à l'écriture des nouveaux fichiers");
      } else if (oldTitle !== title) {
        const res = await imageService.renameItemImages(oldTitle, title, type);
        if (!res) throw new Error('Erreur au renommage des fichiers');
      }

      const updatedItem = await itemService.update(id, data);

      if (!updatedItem)
        throw new Error("Erreur à l'enregistrement en base de donnée");

      return updatedItem;
    },

    deleteItem: async (root, { id, type }, { req }) => {
      if (!await isAuthenticated(req)) throw new Error("Erreur d'authentification");

      const itemService = new ItemModelService(type);
      const item = await itemService.getById(id);
      if (!item) throw new Error('Item absent en BDD');

      const isDeleted = await imageService.deleteItemImages(item.title, type);
      if (!isDeleted) throw new Error(`Echec de la suppression des images`);
      else {
        itemService
          .delete(id)
          .then(res => res)
          .catch(() => {
            throw new Error('Echec de la suppression en Bdd');
          });
      }
      return id;
    },
  },
};
