import React from 'react';
import PropTypes from 'prop-types';

import Item from '../item/Item';
import s from './ItemTab.module.css';
import ItemObject from '../../../data/lib/ItemObject';

function ItemTab({ year, type, data }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <section>
      <h2 className="hidden">{year}</h2>
      {data.itemsByPart &&
        data.itemsByPart.map((item) => {
          const itemObject = new ItemObject(item, type);
          return <Item key={item.title} itemObject={itemObject} />;
        })}
      <button type="button" onClick={scrollTop} className={s.buttonLink}>
        Haut de page
      </button>
    </section>
  );
}

ItemTab.propTypes = {
  year: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default ItemTab;
