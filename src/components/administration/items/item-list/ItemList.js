import React from 'react';
import PropTypes from 'prop-types';

import ItemRow from '../item-row/ItemRow';
import s from './ItemList.module.css';
import ITEM_CONSTANT from '../../../../constants/itemConstant';
import ItemObject from '../../../../utils/ItemObject';

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
            {type === ITEM_CONSTANT.SCULPTURE.TYPE && (
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
              const itemObject = new ItemObject(item, type);
              return <ItemRow key={item.id} itemObject={itemObject} />;
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