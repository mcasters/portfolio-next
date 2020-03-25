import PropTypes from 'prop-types';

import ItemList from '../ItemList/ItemList';
import ItemAdd from '../ItemAddForm/ItemAdd';

export default function AdminItemParent({ type, items }) {
  return (
    <>
      <ItemAdd type={type} />
      <ItemList type={type} items={items} />
    </>
  );
}

AdminItemParent.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
