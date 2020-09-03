import React from 'react';
import PropTypes from 'prop-types';

import s from './ItemRow.module.css';
import ItemDeleteButton from '../item-delete/ItemDeleteButton';
import ItemUpdateButton from '../item-update/ItemUpdateButton';
import { createDateFormat } from '../../../../tools/utils';

function ItemRow({ itemObject }) {
  return (
    <tr className={s.row}>
      <td>{itemObject.title}</td>
      <td>{createDateFormat(itemObject.date)}</td>
      <td>{itemObject.technique}</td>
      <td>{itemObject.description}</td>
      <td>{itemObject.height}</td>
      <td>{itemObject.width}</td>
      {itemObject.isSculpture && <td>{itemObject.length}</td>}
      <td>
        <img
          src={`${itemObject.getSMPaths()[0]}`}
          alt="image admin"
          className={s.thumbnail}
        />
      </td>
      <td>
        <ItemDeleteButton id={itemObject.getId()} type={itemObject.getType()} />
      </td>
      <td>
        <ItemUpdateButton itemObject={itemObject} />
      </td>
    </tr>
  );
}

ItemRow.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default ItemRow;
