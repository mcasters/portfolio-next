import PropTypes from 'prop-types';
import React from 'react';

import ITEM from '../../../constants/itemConstant';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
import s from './Item.module.css';
import Image from '../Image';
import { createDateFormat } from '../../../tools/utils';

function Item({ item, type }) {
  const email = GLOBAL_CONSTANTS.EMAIL;

  return (
    <article className={s.itemContainer}>
      <h2 className={s.itemTitle}>
        <cite>{item.title}</cite>
      </h2>
      <Image type={type} title={item.title} />
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
  item: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    technique: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Item;
