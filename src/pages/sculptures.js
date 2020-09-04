import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';
import ItemObject from '../lib/ItemObject';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';

const Sculptures = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className="hidden">{CONST.SCULPTURE.TITLE}</h1>
        {data.allItems &&
          data.allItems.map((sculpture) => {
            const itemObject = new ItemObject(sculpture, CONST.SCULPTURE.TYPE);
            return <Item key={sculpture.title} itemObject={itemObject} />;
          })}
      </section>
      <ScrollTop />
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
