import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/api/queries';
import { queryGraphql } from '../data/graphql/api/server-side/query-graphql-ssr';

const Dessins = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className="hidden">{CONST.DRAWING.TITLE}</h1>
        {data.allItems &&
          data.allItems.map((drawing) => (
            <Item
              key={drawing.title}
              item={drawing}
              type={CONST.DRAWING.TYPE}
            />
          ))}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await queryGraphql(ALL_ITEMS, { type: CONST.DRAWING.TYPE });
  return {
    props: {
      data,
    },
  };
}

export default Dessins;
