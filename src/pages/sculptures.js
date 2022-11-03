import Item from '../components/item-dir/item/Item';
import ITEM from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';

const Sculptures = ({ data }) => {
  const type = ITEM.SCULPTURE.TYPE;
  return (
    <Layout>
      <section>
        <h1 className="hidden">{type}</h1>
        {data.allItems &&
          data.allItems.map((sculpture) => {
            return <Item key={sculpture.title} item={sculpture} type={type} />;
          })}
      </section>
      <ScrollTop />
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = await queryGraphql(ALL_ITEMS, { type: ITEM.SCULPTURE.TYPE });
  return {
    props: {
      data,
    },
  };
}

export default Sculptures;