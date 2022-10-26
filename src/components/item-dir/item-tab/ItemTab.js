import PropTypes from 'prop-types';

import Item from '../item/Item';
import ItemObject from '../../../utils/ItemObject';
import ScrollTop from '../ScrollTop/ScrollTop';

function ItemTab({ year, type, data }) {
  return (
    <section>
      <h2 className="hidden">{year}</h2>
      {data.itemsByPart &&
        data.itemsByPart.map((item) => {
          const itemObject = new ItemObject(item, type);
          return <Item key={item.title} itemObject={itemObject} />;
        })}
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