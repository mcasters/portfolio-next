import React from 'react';
import PropTypes from 'prop-types';

import ItemRow from '../item-row/ItemRow';
import s from './ItemList.module.css';
import CONSTANT from '../../../../constants/itemConstant';

function ItemList({ type, items }) {
  const title = 'Modification - Suppression';

  return (
    <div className={s.listContainer}>
      <h2>{title}</h2>
      <table className={s.adminList}>
        <thead>
          <tr>
            <th className={s.headings}>Titre</th>
            <th className={s.headings}>Date</th>
            <th className={s.headings}>Technique</th>
            <th className={s.headings}>Description</th>
            <th className={s.headings}>Hauteur</th>
            <th className={s.headings}>Largeur</th>
            {type === CONSTANT.SCULPTURE.TYPE && (
              <th className={s.headings}>Longueur</th>
            )}
            <th className={s.headings}>Image</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item) => {
              return <ItemRow key={item.id} item={item} type={type} />;
            })}
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