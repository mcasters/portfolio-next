import React from 'react';
import PropTypes from 'prop-types';

import ItemRow from '../ItemRow/ItemRow';
import s from './ItemList.module.css';
import ItemService from '../../../../app-services/ItemService';

function ItemList({ type, items }) {
  const itemService = new ItemService(type);
  const isSculpture = itemService.getIsSculpture();
  const path = itemService.getPath();
  const title = 'Modification - Suppression';

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
          {items &&
            items.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                srcList={getUrlImages(item.title)}
                type={type}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

ItemList.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default ItemList;
