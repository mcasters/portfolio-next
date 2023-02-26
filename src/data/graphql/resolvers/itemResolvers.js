import { GraphQLScalarType, Kind } from 'graphql';

import ModelService from '../../models/modelService';
import { isAuth } from '../../../components/utils/authUtils';
import { deleteItemImages, renameItemImages } from '../../utils/imageUtils';

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

const itemResolvers = {
  Date: dateScalar,

  Query: {
    allItems: async (parent, { type }) =>
      await new ModelService(type).getAllItems(),
    itemsByYear: async (parent, { type, year }) =>
      await new ModelService(type).getItemsByYear(year),
  },

  Mutation: {
    addItem: async (root, { item }, { req }) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const { title, type } = item;
      const service = new ModelService(type);

      const itemBDD = await service.getByName(title);
      if (itemBDD) throw new Error("Nom de l'item déjà existant en Bdd");

      let newItem;
      try {
        newItem = await service.add(item);
      } catch (e) {
        await deleteItemImages(title, type);
        throw new Error(`Erreur à l'enregistrement en base de donnée : ${e}`);
      }
      return newItem;
    },

    updateItem: async (root, { item }, { req }) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const { id, type, hasImages, ...data } = item;
      const { title } = item;
      const modelService = new ModelService(type);

      const oldItem = await modelService.getById(id);
      if (!oldItem) throw new Error('Item à modifier introuvable en BDD');

      const itemBdd = await modelService.getByName(title);
      if (itemBdd && itemBdd.id !== item.id)
        throw new Error("Nom d'item déjà existant en Bdd");

      let res;
      if (oldItem.title !== title) {
        if (item.hasImages) {
          res = await deleteItemImages(oldItem.title, item.type);
          if (!res)
            throw new Error(
              'Erreur à la suppression des anciens fichiers image',
            );
        } else {
          res = await renameItemImages(oldItem.title, title, type);
          if (!res) throw new Error('Erreur au renommage des fichiers image');
        }
      }

      try {
        res = await modelService.update(id, data);
      } catch (e) {
        if (oldItem.title !== title)
          await renameItemImages(title, oldItem.title, type);
        throw new Error(`Erreur à l'enregistrement en base de donnée : ${e}`);
      }
      return res;
    },

    deleteItem: async (root, { id, type }, { req }) => {
      if (!(await isAuth(req))) throw new Error("Erreur d'authentification");

      const itemService = new ModelService(type);
      const item = await itemService.getById(id);
      if (!item) throw new Error('Item absent en BDD');

      const isDeleted = await deleteItemImages(item.title, type);

      if (!isDeleted) throw new Error(`Échec de la suppression des images`);
      else {
        const res = await itemService.delete(id);
        if (res) return true;
        else throw new Error('Échec de la suppression en Bdd');
      }
    },
  },
};

export default itemResolvers;
