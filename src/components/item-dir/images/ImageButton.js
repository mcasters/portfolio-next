import { useState} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import ITEM from '../../../constants/itemConstant';
import { getAltImage } from '../../utils/itemUtils';
import s from './Images.module.css';

function ImageButton({ type, src, index, handleLightbox }) {
  const [ratio, setRatio] = useState(0);

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
      className={ type === ITEM.SCULPTURE.TYPE ? s.sculptureButton : s.noSculptureButton }
    >
      <Image
        alt={getAltImage(type)}
        src={`${src}`}
        quality={100}
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setRatio(naturalWidth / naturalHeight);
        }}
        width="0"
        height="0"
        sizes="(max-width: 768px) 100vw,
              560px"
        className={ratio > 1 ? s.LandscapeImage : s.portraitImage}
      />
    </button>
  );
}

ImageButton.propTypes = {
  type: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  index: PropTypes.number,
  handleLightbox: PropTypes.func.isRequired,
};

export default ImageButton;
