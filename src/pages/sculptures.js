import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';

const Sculptures = ({ data }) => {
  return (
    <Layout>
      <h1 className="hidden">{CONST.SCULPTURE.TITLE}</h1>
      {data.allItems &&
        data.allItems.map((sculpture) => (
          <Item
            key={sculpture.title}
            item={sculpture}
            type={CONST.SCULPTURE.TYPE}
          />
        ))}
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await queryGraphql(ALL_ITEMS, { type: CONST.SCULPTURE.TYPE });
  return {
    props: {
      data,
    },
  };
}

export default Sculptures;
