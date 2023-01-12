import { GraphQLScalarType, Kind } from 'graphql';

import ModelService from '../../../utils/modelService';
import { isAuth } from '../../../utils/auth';
import {
  addImages,
  deleteItemImages,
  renameItemImages,
} from '../../../utils/writeImageUtils';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export default {
  Date: dateScalar,

  Query: {
    allItems: async (parent, { type }) =>
      await new ModelService(type).getAllItems(),
    itemsByYear: async (parent, { type, year }) =>
      await new ModelService(type).getItemsByYear(year),
  },

  Mutation: {
    addItem: async (root, { item: { type, ...data } }, { req }) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const { title } = data;
      const service = new ModelService(type);

      const item = await service.getByName(title);
      if (item) throw new Error("Nom de l'item déjà existant en Bdd");

      const res = await addImages(title, type);
      if (!res) throw new Error("Erreur à l'écriture des fichiers image");

      let newItem;
      try {
        newItem = await service.add(data, type);
      } catch (e) {
        await deleteItemImages(title, type);
        throw new Error("Erreur à l'enregistrement en base de donnée : " + e);
      }
      return newItem;
    },

    updateItem: async (
      root,
      { item: { id, type, hasImages, ...data } },
      { req },
    ) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const modelService = new ModelService(type);

      const oldItem = await modelService.getById(id);
      if (!oldItem) throw new Error('Item à modifier introuvable en BDD');

      const { title } = data;
      const itemByName = await modelService.getByName(title, type);
      if (itemByName && itemByName.id !== id)
        throw new Error("Nom d'item déjà existant en Bdd");

      const oldTitle = oldItem.title;
      let res;

      if (hasImages) {
        res = await addImages(title, type);
        if (!res)
          throw new Error("Erreur à l'écriture des nouveaux fichiers image");

        if (oldTitle !== title) {
          res = await deleteItemImages(oldTitle, type);
          if (!res)
            throw new Error(
              'Erreur à la suppression des anciens fichiers image',
            );
        }
      } else if (oldTitle !== title) {
        res = await renameItemImages(oldTitle, title, type);
        if (!res) throw new Error('Erreur au renommage des fichiers image');
      }

      try {
        res = await modelService.update(id, data);
      } catch (e) {
        if (oldTitle !== title) await renameItemImages(title, oldTitle, type);
        throw new Error(
          "Erreur à l'enregistrement en base de donnée : " + e,
        );
      }

      return res;
    },

    deleteItem: async (root, { id, type }, { req }) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

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