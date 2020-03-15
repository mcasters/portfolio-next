import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import ItemRow from '../ItemRow/ItemRow';
import s from './ItemList.module.css';
import GET_ITEMS_QUERY from '../../../../data/graphql/queries/getAllItems';
import ItemService from '../../../../app-services/ItemService';

function ItemList({ type, deleteMutation, updateMutation }) {
  const itemService = new ItemService(type);
  const isSculpture = itemService.getIsSculpture();
  const path = itemService.getPath();
  const title = 'Modification - Suppression';
  const { loading, error, data, refetch } = useQuery(GET_ITEMS_QUERY, {
    variables: { type },
    ssr: true,
  });

  const getUrlImages = itemTitle => {
    const imageUrls = [];

    if (isSculpture) {
      let i = 1;

      while (i < 5) {
        imageUrls.push(`${path}/sm/${itemTitle}_${i}.jpg`);
        i++;
      }
    } else imageUrls.push(`${path}/sm/${itemTitle}.jpg`);

    return imageUrls;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur au chargement :(</div>;

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <table className={s.adminList}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Technique</th>
            <th>Description</th>
            <th>Hauteur</th>
            <th>Largeur</th>
            {isSculpture && <th>Longueur</th>}
            <th>Image</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.getAllItems !== undefined &&
            data.getAllItems.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                srcList={getUrlImages(item.title)}
                type={type}
                deleteMutation={deleteMutation}
                updateMutation={updateMutation}
                refetch={refetch}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

ItemList.propTypes = {
  type: PropTypes.string.isRequired,
  deleteMutation: PropTypes.func.isRequired,
  updateMutation: PropTypes.func.isRequired,
};

export default ItemList;
