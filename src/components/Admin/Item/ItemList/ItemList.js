import React from 'react';
import PropTypes from 'prop-types';

import ItemRow from '../ItemRow/ItemRow';
import s from './ItemList.module.css';
import ItemConstant from '../../../../constants/item';

function ItemList({ type, items }) {
  const title = 'Modification - Suppression';

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
            {type === ItemConstant.SCULPTURE.TYPE && <th>Longueur</th>}
            <th>Image</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map(item => (
              <ItemRow key={item.id} item={item} type={type} />
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
