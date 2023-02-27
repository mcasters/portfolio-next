import PropTypes from 'prop-types';

import Item from '../components/item-dir/item/Item';
import ITEM from '../constants/item';
import Layout from '../components/layout-components/layout/Layout';
import { ALL_ITEMS } from '../data/graphql/queries';
import { queryGraphql } from '../data/request/request-ssr';
import ScrollTop from '../components/item-dir/ScrollTop/ScrollTop';
import s from './styles/item.module.css';
import { getItemObject } from '../components/utils/itemUtils';

const Sculptures = ({ data }) => {
  return (
    <Layout>
      <section>
        <h1 className={s.title}>{ITEM.SCULPTURE.PAGE_TITLE}</h1>
        {data.allItems &&
          data.allItems.map((sculpture, i) => {
            return sculpture !== null ? (
              <Item
                key={sculpture.title}
                item={getItemObject(sculpture, ITEM.SCULPTURE.TYPE)}
                first={i < 4}
              />
            ) : null;
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

Sculptures.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Sculptures;
