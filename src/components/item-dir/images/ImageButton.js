import PropTypes from 'prop-types';
import Image from 'next/image';

import s from './ImageButton.module.css';
import { useState } from 'react';
import ITEM from '../../../constants/item';

function ImageButton({ item, src, index, handleLightbox, first }) {
  const isSculpture = item.type === ITEM.SCULPTURE.TYPE;
  const [portrait, setPortrait] = useState(true);

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
      className={
        isSculpture && portrait
          ? s.portraitSculptureButton
          : isSculpture && !portrait
          ? s.landscapeSculptureButton
          : s.button
      }
    >
      <Image
        alt={item.alt}
        src={`${src}`}
        quality={100}
        priority={first}
        fill
        sizes="(max-width: 768px) 70vw, 540px"
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          const ratio = naturalWidth / naturalHeight;
          if (ratio > 1) setPortrait(false);
        }}
        className={s.image}
      />
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
