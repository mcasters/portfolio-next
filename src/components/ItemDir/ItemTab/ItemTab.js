import React from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';
import s from './ItemTab.module.css';

function ItemTab({ year, type, items }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <section>
      <h2 className={s.titleTab}>{year}</h2>
      {items.map((item, index) => (
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
  items: PropTypes.array.isRequired,
};

export default ItemTab;
