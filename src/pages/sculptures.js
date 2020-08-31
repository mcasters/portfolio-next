import useSWR from 'swr';

import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';

const Sculptures = ({ items }) => {
  return (
    <Layout>
      <h1 className="hidden">{CONST.SCULPTURE.TITLE}</h1>
      {items &&
        items.map((sculpture) => (
          <Item key={sculpture.title} item={sculpture} type={CONST.SCULPTURE.TYPE} />
        ))}
    </Layout>
  );
};

export async function getServerSideProps() {
  const type = CONST.SCULPTURE.TYPE;
  const data = await queryGraphql(ALL_ITEMS, { type });
  return {
    props: {
      items: data.allItems,
    },
  };
}

export default Sculptures;
