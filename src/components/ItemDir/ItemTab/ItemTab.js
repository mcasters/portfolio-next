import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import Item from '../Item';
import GET_ITEMS_BY_PART_QUERY from '../../../data/graphql/queries/itemByPart';
import s from './ItemTab.module.css';

function ItemTab({ year, half, type }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const { data, loading, error } = useQuery(GET_ITEMS_BY_PART_QUERY, {
    variables: { year, type, half },
    ssr: true,
  });

  if (loading) return <div className={s.loading}>Chargement...</div>;
  if (error) return <div>Erreur au chargement des items :(</div>;

  return (
    <section>
      <h2 className={s.titleTab}>{year}</h2>
      {data &&
        data.getItemsByPart.map((item, index) => (
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
  half: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemTab;
