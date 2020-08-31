import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import Item from '../item/Item';
import s from './ItemTab.module.css';
import { ITEMS_BY_PART } from '../../../data/graphql/api/queries';
import { itemsByPartRequest } from '../../../data/graphql/api/client-side/query-graphql';

function ItemTab({ year, type, part }) {
  const { data } = useSWR(
    [ITEMS_BY_PART, year, type, part],
    itemsByPartRequest,
  );

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <section>
      <h2 className={s.titleTab}>{year}</h2>
      {data &&
        data.itemsByPart.map((item, index) => (
          <Item key={item.title} item={item} type={type} index={index} />
        ))}
      <button type="button" onClick={scrollTop} className={s.buttonLink}>
        Haut de page
      </button>
    </section>
  );
}

ItemTab.propTypes = {
  year: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  part: PropTypes.number.isRequired,
};

export default ItemTab;
