import PropTypes from 'prop-types';
import Image from 'next/image';

import s from './ImageButton.module.css';
import { useEffect, useRef, useState } from 'react';
import useViewport from '../../hooks/useViewport';
import LAYOUT from '../../../constants/layout';
import ITEM from '../../../constants/itemConstant';
import useClientRect from '../../hooks/useClientRect';

function ImageButton({ item, src, index, handleLightbox, first }) {
  const [offset, setOffset] = useState(0);
  const { windowWidth } = useViewport();
  const [rect, buttonRef] = useClientRect();

  const isSM = windowWidth < LAYOUT.BREAKPOINT.SM;
  const isSculpture = item.type === ITEM.SCULPTURE.TYPE;

  const getOffset = (naturalWidth, naturalHeight) => {
    const buttonHeight = rect.height;
    const imageHeight = isSM
      ? (0.75 * windowWidth * naturalHeight) / naturalWidth
      : ((LAYOUT.MAIN_WIDTH / 2) * naturalHeight) / naturalWidth;

    let offset;
    if (isSM) offset = (buttonHeight - imageHeight) * 0.95 * index;
    else if (index === 2 || index === 3) offset = buttonHeight - imageHeight;
    setOffset(offset);
  };

  const triggerLightbox = () => {
    handleLightbox(index);
  };

  return (
    <button
      ref={buttonRef}
      role="button"
      aria-label="Lightbox"
      type="button"
      onClick={triggerLightbox}
      key={src}
      className={isSculpture ? s.sculptureButton : s.noSculptureButton}
    >
      {isSculpture ? (
        <Image
          alt={item.alt}
          src={`${src}`}
          quality={100}
          priority={first}
          fill
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            if (naturalWidth / naturalHeight > 1)
              getOffset(naturalWidth, naturalHeight);
          }}
          className={s.image}
          style={offset !== 0 ? { top: `-${offset}px` } : undefined}
        />
      ) : (
        <Image
          alt={item.alt}
          src={`${src}`}
          quality={100}
          priority={first}
          fill
          className={s.image}
        />
      )}
    </button>
  );
}

ImageButton.propTypes = {
  item: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleLightbox: PropTypes.func.isRequired,
  first: PropTypes.bool.isRequired,
};

export default ImageButton;
