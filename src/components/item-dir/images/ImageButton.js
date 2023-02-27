import PropTypes from 'prop-types';
import Image from 'next/image';

import s from './ImageButton.module.css';
import { useEffect, useRef, useState } from 'react';
import useViewport from '../../hooks/useWindowSize';
import LAYOUT from '../../../constants/layout';
import ITEM from '../../../constants/item';

function ImageButton({ item, src, index, handleLightbox, first }) {
  const buttonRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [ratioLandscape, setRatioLandscape] = useState(0);
  const windowRect = useViewport();

  const isSculpture = item.type === ITEM.SCULPTURE.TYPE;

  useEffect(() => {
    if (isSculpture && ratioLandscape !== 0) {
      const buttonHeight = buttonRef.current.getBoundingClientRect().height;

      if (windowRect.innerWidth < LAYOUT.BREAKPOINT.SM) {
        const imageHeight =
          (0.8 * windowRect.innerWidth) /
          ratioLandscape;
        setOffset((buttonHeight - imageHeight) * index);
      } else if (index === 2 || index === 3) {
        const imageHeight = LAYOUT.MAIN_WIDTH_PX / 2 / ratioLandscape;
        setOffset(buttonHeight - imageHeight * 1.1);
      }
    }
  }, [ratioLandscape, windowRect]);

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
            const ratio = naturalWidth / naturalHeight;
            if (ratio > 1) setRatioLandscape(ratio);
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
