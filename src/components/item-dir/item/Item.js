import PropTypes from 'prop-types';

import ITEM from '../../../constants/itemConstant';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import s from './Item.module.css';
import Images from '../images/Images';
import { createDateFormat } from '../../../tools/utils';

function Item({ item, type }) {
  const email = GLOBAL_CONSTANTS.EMAIL;

  return (
    <article className={s.itemContainer}>
      <h2 className={s.itemTitle}>
        <cite>{item.title}</cite>
      </h2>
      <Images item={item} type={type} />
      <figcaption>
        <time dateTime={item.date} className={s.noWrap}>
          {createDateFormat(item.date)}
        </time>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>{item.technique}</p>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>
          {item.height} x {item.width}
          {type === ITEM.SCULPTURE.TYPE && ` x ${item.length}`} cm
        </p>
      </figcaption>
      <address className={s.email}>{email}</address>
    </article>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Item;