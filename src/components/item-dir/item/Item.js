import PropTypes from 'prop-types';

import ITEM from '../../../constants/itemConstant';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import s from './Item.module.css';
import Images from '../images/Images';
import { createDateFormat } from '../../../tools/utils';

function Item({ itemObject }) {
  const email = GLOBAL_CONSTANTS.EMAIL;

  return (
    <article className={s.itemContainer}>
      <h2 className={s.itemTitle}>
        <cite>{itemObject.title}</cite>
      </h2>
      <Images itemObject={itemObject} />
      <figcaption>
        <time dateTime={itemObject.date} className={s.noWrap}>
          {createDateFormat(itemObject.date)}
        </time>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>{itemObject.technique}</p>
        <span className={s.spacer}> | </span>
        <p className={s.noWrap}>
          {itemObject.height} x {itemObject.width}
          {itemObject.getType() === ITEM.SCULPTURE.TYPE &&
            ` x ${itemObject.length}`}{' '}
          cm
        </p>
      </figcaption>
      <address className={s.email}>{email}</address>
    </article>
  );
}

Item.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default Item;
