import PropTypes from 'prop-types';
import { format } from 'date-fns';

import s from './ItemRow.module.css';
import ItemDeleteButton from './ItemDeleteButton';
import UpdateButton from '../update/updateButton';
import CONSTANT from '../../../../constants/itemConstant';
import { getSMPaths } from '../../../utils/itemUtils';

function ItemRow({ item, type }) {
  const FORMAT = CONSTANT.FORMAT_DATE;
  return (
    <tr className={s.row}>
      <td>{item.title}</td>
      <td>{format(item.date, FORMAT)}</td>
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
        <UpdateButton id={item.id} item={item} type={type} />
      </td>
    </tr>
  );
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemRow;