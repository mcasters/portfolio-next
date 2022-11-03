import Item from '../components/item-dir/item/Item';
import ITEM from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';

const Dessins = ({ data }) => {
  const type = ITEM.DRAWING.TYPE;

  return (
    <Layout>
      <section>
        <h1 className="hidden">{type}</h1>
        {data.allItems &&
          data.allItems.map((drawing) => {
            return <Item key={drawing.title} item={drawing} type={type} />;
          })}
      </section>
      <ScrollTop />
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await queryGraphql(ALL_ITEMS, { type: ITEM.DRAWING.TYPE });
  return {
    props: {
      data,
    },
  };
}

export default Dessins;