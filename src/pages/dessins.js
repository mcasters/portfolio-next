import useSWR from 'swr';

import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { allItemsRequest } from '../data/graphql/api/query-graphql';

const Dessins = () => {
  const type = CONST.DRAWING.TYPE;
  const { data } = useSWR([ALL_ITEMS, type], allItemsRequest);

  return (
    <Layout>
      <section>
        <h1 className="hidden">{CONST.DRAWING.TITLE}</h1>
        {data &&
          data.allItems.map((drawing) => (
            <Item key={drawing.title} item={drawing} type={type} />
          ))}
      </section>
    </Layout>
  );
};

export default Dessins;
