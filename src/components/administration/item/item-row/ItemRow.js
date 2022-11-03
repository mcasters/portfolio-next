import React from 'react';
import PropTypes from 'prop-types';

import s from './ItemRow.module.css';
import ItemDeleteButton from './ItemDeleteButton';
import ItemUpdateButton from './ItemUpdateButton';
import { createDateFormat } from '../../../../tools/utils';
import CONSTANT from '../../../../constants/itemConstant';
import { getSMPaths } from '../../utils/itemUtils';

function ItemRow({ item, type }) {
  return (
    <tr className={s.row}>
      <td>{item.title}</td>
      <td>{createDateFormat(item.date)}</td>
      <td>{item.technique}</td>
      <td>{item.description}</td>
      <td>{item.height}</td>
      <td>{item.width}</td>
      {type === CONSTANT.SCULPTURE.TYPE && <td>{item.length}</td>}
      <td>
        <img
          src={`${getSMPaths(item, type)[0]}`}
          alt="image admin"
          className={s.thumbnail}
        />
      </td>
      <td>
        <ItemDeleteButton id={item.id} type={type} />
      </td>
      <td>
        <ItemUpdateButton id={item.id} item={item} type={type} />
      </td>
    </tr>
  );
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemRow;