import PropTypes from 'prop-types';

import ItemList from '../ItemList/ItemList';
import ItemAddForm from '../ItemAddForm/ItemAddForm';

export default function AdminItemParent({ type, items }) {
  return (
    <>
      <ItemAddForm type={type} />
      <ItemList type={type} items={items} />
    </>
  );
}

AdminItemParent.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
