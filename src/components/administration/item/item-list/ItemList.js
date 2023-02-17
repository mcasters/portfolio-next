import PropTypes from 'prop-types';

import ItemRow from '../item-row/ItemRow';
import s from './ItemList.module.css';
import CONSTANT from '../../../../constants/itemConstant';
import {getEnhancedItem} from "../../../utils/itemUtils";

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
            {type === CONSTANT.SCULPTURE.TYPE && <th>Longueur</th>}
            <th>Image</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item) => {
              const enhancedItem = getEnhancedItem(item, type);
              return <ItemRow key={item.id} item={enhancedItem} />;
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
