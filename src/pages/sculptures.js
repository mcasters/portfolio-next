import useSWR from 'swr';

import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { allItemsRequest } from '../data/graphql/api/client-side/query-graphql';

const Sculptures = () => {
  const type = CONST.SCULPTURE.TYPE;
  const { data } = useSWR([ALL_ITEMS, type], allItemsRequest);

  return (
    <Layout>
      <h1 className="hidden">{CONST.SCULPTURE.TITLE}</h1>
      {data &&
        data.allItems.map((sculpture) => (
          <Item key={sculpture.title} item={sculpture} type={type} />
        ))}
    </Layout>
  );
};

export default Sculptures;
