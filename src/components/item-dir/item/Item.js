import PropTypes from 'prop-types';
import { format } from 'date-fns';

import ITEM from '../../../constants/itemConstant';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import s from './Item.module.css';
import Images from '../images/Images';

function Item({ item }) {
  return (
    <article className={s.itemContainer}>
      <h2 className={s.itemTitle}>
        <cite>{item.title}</cite>
      </h2>
      <Images item={item} />
      <figcaption>
        <time dateTime={item.date} className={s.noWrap}>
          {format(item.date, ITEM.FORMAT_DATE)}
        </time>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>{item.technique}</p>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>
          {item.height} x {item.width}
          {item.type === ITEM.SCULPTURE.TYPE && ` x ${item.length}`} cm
        </p>
      </figcaption>
      <address className={s.email}>{GLOBAL_CONSTANTS.EMAIL}</address>
    </article>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
