import Item from '../components/item-dir/item/Item';
import ITEM from '../constants/itemConstant';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';
import s from './styles/item.module.css';
import PropTypes from 'prop-types';

const Sculptures = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className={s.title}>{ITEM.SCULPTURE.TITLE}</h1>
        {data.allItems &&
          data.allItems.map((sculpture) =>
            sculpture != null ? (
              <Item
                key={sculpture.title}
                item={sculpture}
                type={ITEM.SCULPTURE.TYPE}
              />
            ) : null,
          )}
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

Sculptures.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Sculptures;
