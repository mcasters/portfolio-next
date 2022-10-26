import PropTypes from 'prop-types';
import useSWR from 'swr';

import ItemList from '../item-list/ItemList';
import ItemAdd from '../item-add/ItemAdd';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../data/request/request';

export default function AdminItemParent({ type }) {
  const { data } = useSWR([ALL_ITEMS_ADMIN, type], allItemsRequest);

  return (
    <>
      <ItemAdd type={type} />
      {data && <ItemList type={type} items={data.allItems} />}
    </>
  );
}

AdminItemParent.propTypes = {
  type: PropTypes.string.isRequired,
};