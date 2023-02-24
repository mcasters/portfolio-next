import PropTypes from 'prop-types';
import useSWR from 'swr';

import ItemList from './item/item-list/ItemList';
import AddForm from './item/add/AddForm';
import { ALL_ITEMS_ADMIN } from '../../data/graphql/queries';
import { fetcher } from '../../data/request/request';

export default function AdminItem({ type }) {
  const { data } = useSWR(
    [ALL_ITEMS_ADMIN, { type }],
    ([query, variables]) => fetcher(query, variables),
  );

  return (
    <>
      <AddForm type={type} />
      {data && <ItemList type={type} graphQLItems={data.allItems} />}
    </>
  );
}

AdminItem.propTypes = {
  type: PropTypes.string.isRequired,
};
