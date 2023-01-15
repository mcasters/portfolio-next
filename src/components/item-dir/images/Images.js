import { useState } from 'react';
import PropTypes from 'prop-types';

import LAYOUT from '../../../constants/layout';
import LightBox from '../../lightbox/Lightbox';
import useViewport from '../../hooks/useViewport';
import {
  getLightboxTitle,
  getMainPaths,
  getMDPaths,
  getSMPaths,
} from '../../utils/itemUtils';
import ImageButton from './ImageButton';

function Images({ item, type }) {
  const { windowWidth } = useViewport();
  const [imageIndex, setImageIndex] = useState(null);

  const isLessThanSM = windowWidth < LAYOUT.BREAKPOINT.SM;

  const getCurrentPaths = () =>
    isLessThanSM ? getSMPaths(item, type) : getMDPaths(item, type);

  const getLightboxImages = () => {
    const urls = isLessThanSM
      ? getMDPaths(item, type)
      : getMainPaths(item, type);
    return urls.map((image) => {
      let obj = {};
      obj['url'] = image;
      obj['title'] = getLightboxTitle(item);
      return obj;
    });
  };

  const closeLightbox = () => {
    setImageIndex(null);
  };

  const openLightbox = (i) => {
    setImageIndex(i);
  };

  return (
    <>
      <figure>
        {getCurrentPaths().map((src, i) => {
          return (
            <ImageButton
              key={src}
              type={type}
              src={src}
              index={i}
              handleLightbox={openLightbox}
            />
          );
        })}
      </figure>
      {imageIndex !== null && (
        <LightBox
          images={getLightboxImages()}
          onClose={closeLightbox}
          startIndex={imageIndex}
        />
      )}
    </>
  );
}

Images.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Images;