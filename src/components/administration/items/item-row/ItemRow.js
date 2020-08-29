import React from 'react';
import PropTypes from 'prop-types';

import s from './ItemRow.module.css';
import ItemDeleteButton from '../item-delete/ItemDeleteButton';
import ItemUpdateButton from '../item-update/ItemUpdateButton';
import Item from '../../../../data/lib/Item';
import { createDateFormat } from '../../../../tools/utils';

function ItemRow({ item, type }) {
  const itemModel = new Item(item.title, type);
  const srcList = itemModel.getSMPaths(itemModel.getFilenames());

  return (
    <tr className={s.row}>
      <td>{item.title}</td>
      <td>{createDateFormat(item.date)}</td>
      <td>{item.technique}</td>
      <td>{item.description}</td>
      <td>{item.height}</td>
      <td>{item.width}</td>
      {itemModel.isSculpture && <td>{item.length}</td>}
      <td>
        <img src={`${srcList[0]}`} alt="image admin" className={s.thumbnail} />
      </td>
      <td>
        <ItemDeleteButton id={item.id} type={type} />
      </td>
      <td>
        <ItemUpdateButton item={item} type={type} srcList={srcList} />
      </td>
    </tr>
  );
}

ItemRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    technique: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemRow;
