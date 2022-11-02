import PropTypes from 'prop-types';
import useSWR from 'swr';

import ItemList from './item/item-list/ItemList';
import AddForm from './item/add/AddForm';
import { ALL_ITEMS_ADMIN } from '../../data/graphql/queries';
import { allItemsRequest } from '../../data/request/request';

export default function AdminItemParent({ type }) {
  const { data } = useSWR([ALL_ITEMS_ADMIN, type], allItemsRequest);

  return (
    <>
      <AddForm type={type} />
      {data && <ItemList type={type} items={data.allItems} />}
    </>
  );
}

AdminItemParent.propTypes = {
  type: PropTypes.string.isRequired,
};