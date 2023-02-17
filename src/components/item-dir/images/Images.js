import { useState } from 'react';
import PropTypes from 'prop-types';

import LAYOUT from '../../../constants/layout';
import ITEM from '../../../constants/itemConstant';
import LightBox from '../../lightbox/Lightbox';
import useViewport from '../../hooks/useViewport';
import ImageButton from './ImageButton';

function Images({ item }) {
  const { windowWidth } = useViewport();
  const [imageIndex, setImageIndex] = useState(null);

  const isSculpture = item.type === ITEM.SCULPTURE.TYPE;
  const isLessThanSM = windowWidth < LAYOUT.BREAKPOINT.SM;
  const currentPaths = isLessThanSM ? item.SMPaths : item.MDPaths;
  const lightboxPaths = isLessThanSM ? item.MDPaths : item.LGPaths;

  const getLightboxImages = () => {
    return lightboxPaths.map((path) => {
      return { url: path, title: `Marion Casters | ${item.title}` };
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
        {item.LGPaths.map((src, i) => (
          <ImageButton
            key={src}
            item={item}
            src={src}
            index={i}
            handleLightbox={openLightbox}
          />
        ))}
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
};

export default Images;
