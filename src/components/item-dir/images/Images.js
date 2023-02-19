import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import LAYOUT from '../../../constants/layout';
import LightBox from '../../lightbox/Lightbox';
import useViewport from '../../hooks/useWindowSize';
import ImageButton from './ImageButton';

function Images({ item, first }) {
  const windowRect = useViewport();
  const [imageIndex, setImageIndex] = useState(null);
  const [isSM, setIsSM] = useState(windowRect.innerWidth < LAYOUT.BREAKPOINT.SM)

  const currentPaths = isSM ? item.SMPaths : item.MDPaths;
  const lightboxPaths = isSM ? item.MDPaths : item.LGPaths;

  useEffect(() => {
    setIsSM(windowRect.innerWidth < LAYOUT.BREAKPOINT.SM);
  }, [windowRect]);

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
        {currentPaths.map((src, i) => (
          <ImageButton
            key={src}
            item={item}
            src={src}
            index={i}
            handleLightbox={openLightbox}
            first={first}
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
  first: PropTypes.bool.isRequired,
};

export default Images;
