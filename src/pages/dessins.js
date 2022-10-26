import Item from '../components/item-dir/item/Item';
import CONST from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ItemObject from '../utils/ItemObject';
import ScrollTop from "../components/item-dir/ScrollTop/ScrollTop";

const Dessins = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className="hidden">{CONST.DRAWING.TITLE}</h1>
        {data.allItems &&
          data.allItems.map((drawing) => {
            const itemObject = new ItemObject(drawing, CONST.DRAWING.TYPE);
            return <Item key={drawing.title} itemObject={itemObject} />;
          })}
      </section>
      <ScrollTop />
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