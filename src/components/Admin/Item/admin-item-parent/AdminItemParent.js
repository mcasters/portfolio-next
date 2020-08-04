import PropTypes from 'prop-types';

import ItemList from '../item-list/ItemList';
import ItemAdd from '../item-add/ItemAdd';

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
