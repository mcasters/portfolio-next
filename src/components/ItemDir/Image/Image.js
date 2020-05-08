import { useState } from 'react';
import PropTypes from 'prop-types';

import CONSTANT from '../../../constants/layout';
import LightBox from '../../LightBox/LightBoxProvider';
import Item from '../../../data/lib/Item';
import useViewport from '../../Hooks/useViewport';
import s from './Image.module.css';
import path from 'path';

function Image({ title, type }) {
  const { width } = useViewport();
  const [isOpen, setIsOpen] = useState(false);

  const isLessThanSM = width < CONSTANT.BREAKPOINT.SM;
  const item = new Item(title, type);

  const getCurrentPaths = () =>
    isLessThanSM ? item.getSMPaths() : item.getMDPaths();

  const getLightboxPaths = () =>
    isLessThanSM ? item.getMDPaths() : item.getMainPaths();

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const openLightbox = () => {
    setIsOpen(true);
  };

  return (
    <>
      <figure>
        {getCurrentPaths().map(src => {
          return (
            <button
              type="button"
              onClick={openLightbox}
              className={item.isSculpture ? s.sculptureButton : s.imageButton}
              key={src}
            >
              <img
                src={`/library${src}`}
                alt={item.getAltImage()}
                className={s.image}
              />
            </button>
          );
        })}
      </figure>
      {isOpen && typeof window !== 'undefined' && (
        <LightBox
          title={title}
          images={getLightboxPaths()}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

Image.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Image;
