import React from 'react';
import PropTypes from 'prop-types';

import ITEM from '../../../constants/item';
import GLOBAL_CONSTANTS from '../../../constants/globalConstants';
// import image from '../Image';

function Item({ item, type }) {
  const email = GLOBAL_CONSTANTS.EMAIL;

  return (
    <article>
      <h2>{item.title}</h2>
      {/*<Image type={type} title={item.title} />*/}
      <figcaption>
        <time dateTime={item.date}>
          {new Date(item.date).toLocaleDateString()}
        </time>
        <span> | </span>
        <p>{item.technique}</p>
        <span> | </span>
        <p>
          {item.height} x {item.width}
          {type === ITEM.SCULPTURE.TYPE && ` x ${item.length}`} cm
        </p>
      </figcaption>
      <address>{email}</address>
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
