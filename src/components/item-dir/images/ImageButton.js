import PropTypes from 'prop-types';
import Image from 'next/image';

import s from './ImageButton.module.css';
import { useState } from 'react';
import useViewport from '../../hooks/useViewport';
import LAYOUT from '../../../constants/layout';
import ITEM from '../../../constants/itemConstant';

function ImageButton({ item, src, index, handleLightbox }) {
  const [height, setHeight] = useState(undefined);
  const { windowWidth } = useViewport();

  const isSculpture = item.type === ITEM.SCULPTURE.TYPE;

  const getClassName = () => {
    if (index === 0) return 'imageTopLeft';
    if (index === 1) return 'imageTopRight';
    if (index === 2) return 'imageBottomLeft';
    if (index === 3) return 'imageBottomRight';
  };

  const getHeightForLandscape = (naturalWidth, naturalHeight) => {
    if (windowWidth < LAYOUT.BREAKPOINT.SM)
      setHeight((0.75 * windowWidth * naturalHeight) / naturalWidth);
    else {
      if (isSculpture)
        setHeight(((LAYOUT.MAIN_WIDTH / 2) * naturalHeight) / naturalWidth);
      else setHeight((LAYOUT.MAIN_WIDTH * naturalHeight) / naturalWidth);
    }
  };

  const triggerLightbox = () => {
    handleLightbox(index);
  };

  return (
    <button
      role="button"
      aria-label="Lightbox"
      type="button"
      onClick={triggerLightbox}
      key={src}
      className={isSculpture ? s.sculptureButton : s.noSculptureButton}
      style={{ height }}
    >
      <Image
        alt={item.alt}
        src={`${src}`}
        quality={100}
        fill
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          if (naturalWidth / naturalHeight > 1)
            getHeightForLandscape(naturalWidth, naturalHeight);
        }}
        className={isSculpture ? s[getClassName()] : s.image}
      />
    </button>
  );
}

ImageButton.propTypes = {
  item: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleLightbox: PropTypes.func.isRequired,
};

export default ImageButton;
