import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Item from '../../components/item-dir/item/Item';
import ScrollTop from '../../components/item-dir/ScrollTop/ScrollTop';
import ITEM from '../../constants/itemConstant';
import { queryGraphql } from '../../data/request/request-ssr';
import { ITEMS_BY_YEAR } from '../../data/graphql/queries';
import Layout from '../../components/layout-components/layout/Layout';
import s from '../styles/item.module.css';
import { getEnhancedItem } from '../../components/utils/itemUtils';

export default function YearPage({ data }) {
  const router = useRouter();
  const { year } = router.query;

  return (
    <Layout>
      <section>
        <h1 className={s.title}>{`${ITEM.PAINTING.TITLE} ${year}`}</h1>
        <p className={s.yearTitle}>{year}</p>
        {data.itemsByYear &&
          data.itemsByYear.map((painting, i) => {
            return painting !== null ? (
              <Item
                key={painting.title}
                item={getEnhancedItem(painting, ITEM.PAINTING.TYPE)}
                first={i < 2}
              />
            ) : null;
          })}
        <ScrollTop />
      </section>
    </Layout>
  );
}

YearPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  const type = ITEM.PAINTING.TYPE;
  const year = parseInt(context.params.year, 10);
  const data = await queryGraphql(ITEMS_BY_YEAR, {
    type,
    year,
  });
  return {
    props: {
      data,
    },
  };
}
