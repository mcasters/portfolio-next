import Item from '../components/item-dir/item/Item';
import ITEM from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';
import s from './styles/item.module.css';
import PropTypes from 'prop-types';

const Dessins = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className={s.title}>{ITEM.DRAWING.TITLE}</h1>
        {data.allItems &&
          data.allItems.map((drawing) =>
            drawing != null ? (
              <Item
                key={drawing.title}
                item={drawing}
                type={ITEM.DRAWING.TYPE}
              />
            ) : null,
          )}
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

Dessins.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Dessins;
