import React from 'react';
import PropTypes from 'prop-types';

import s from './ItemRow.module.css';
import ItemDeleteButton from '../ItemDelete/ItemDeleteButton';
import ItemUpdateButton from '../ItemUpdate/ItemUpdateButton';
import ItemService from '../../../../app-services/ItemService';
import { createDateFormat } from '../../../../tools/utils';

function ItemRow({ item, srcList, type }) {
  const itemService = new ItemService(type);
  const isSculpture = itemService.getIsSculpture();
  const alt = itemService.getAltImage();
  const src = srcList[0];

  return (
    <tr className={s.row}>
      <th>{item.title}</th>
      <th>{createDateFormat(item.date)}</th>
      <th>{item.technique}</th>
      <th>{item.description}</th>
      <th>{item.height}</th>
      <th>{item.width}</th>
      {isSculpture && <th>{item.length}</th>}
      <th>
        <img src={src} alt={alt} className={s.thumbnail} />
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
  srcList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemRow;
