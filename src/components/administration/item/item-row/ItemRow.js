import PropTypes from 'prop-types';
import { format } from 'date-fns';

import s from './ItemRow.module.css';
import ItemDeleteButton from './ItemDeleteButton';
import UpdateButton from '../update/updateButton';
import CONSTANT from '../../../../constants/itemConstant';

function ItemRow({ item }) {
  const FORMAT = CONSTANT.FORMAT_DATE;
  return (
    <tr className={s.row}>
      <td>{item.title}</td>
      <td>{format(item.date, FORMAT)}</td>
      <td>{item.technique}</td>
      <td>{item.description}</td>
      <td>{item.height}</td>
      <td>{item.width}</td>
      {item.type === CONSTANT.SCULPTURE.TYPE && <td>{item.length}</td>}
      <td>
        <img
          src={`${item.SMPaths[0]}`}
          alt="image admin"
          className={s.thumbnail}
        />
      </td>
      <td>
        <ItemDeleteButton id={item.id} type={item.type} />
      </td>
      <td>
        <UpdateButton id={item.id} item={item} />
      </td>
    </tr>
  );
}

ItemRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ItemRow;
