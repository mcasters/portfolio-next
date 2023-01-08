import PropTypes from 'prop-types';

import Item from '../item/Item';
import ScrollTop from '../ScrollTop/ScrollTop';

function ItemTab({ year, type, data }) {
  return (
    <section>
      <h2 className="hidden">{year}</h2>
      {data.itemsByPart &&
        data.itemsByPart.map((item) =>
          item != null ? (
            <Item key={item.title} item={item} type={type} />
          ) : null,
        )}
      <ScrollTop />
    </section>
  );
}

ItemTab.propTypes = {
  year: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default ItemTab;