import PropTypes from 'prop-types';
import useSWR from 'swr';

import ItemList from '../item-list/ItemList';
import ItemAdd from '../item-add/ItemAdd';
import { ALL_ITEMS } from '../../../../data/graphql/api/queries';
import { allItemsRequest } from '../../../../data/graphql/api/client-side/query-graphql';

export default function AdminItemParent({ type }) {
  const { data } = useSWR([ALL_ITEMS, type], allItemsRequest);

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
