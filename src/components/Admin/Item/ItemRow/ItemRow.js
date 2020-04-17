import React from 'react';
import PropTypes from 'prop-types';

import s from './ItemRow.module.css';
import ItemDeleteButton from '../ItemDelete/ItemDeleteButton';
import ItemUpdateButton from '../ItemUpdate/ItemUpdateButton';
import Item from '../../../../data/lib/Item';
import { createDateFormat } from '../../../../tools/utils';

function ItemRow({ item, type }) {
  const itemModel = new Item(item.title, type);
  const srcList = itemModel.getSMPaths(itemModel.getFilenames());

  return (
    <tr className={s.row}>
      <th>{item.title}</th>
      <th>{createDateFormat(item.date)}</th>
      <th>{item.technique}</th>
      <th>{item.description}</th>
      <th>{item.height}</th>
      <th>{item.width}</th>
      {itemModel.isSculpture && <th>{item.length}</th>}
      <th>
        <img
          src={require(`${srcList[0]}`)}
          alt="image admin"
          className={s.thumbnail}
        />
      </th>
      <th>
        <ItemDeleteButton id={item.id} type={type} />
      </th>
      <th>
        <ItemUpdateButton item={item} type={type} srcList={srcList} />
      </th>
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
