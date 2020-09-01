import { useState } from 'react';
import PropTypes from 'prop-types';

import CONSTANT from '../../../constants/layout';
import LightBox from '../../react-lightbox/LightBoxProvider';
import useViewport from '../../hooks/useViewport';
import s from './Images.module.css';

function Images({ itemObject }) {
  const { windowWidth } = useViewport();
  const [isOpen, setIsOpen] = useState(false);

  const isLessThanSM = windowWidth < CONSTANT.BREAKPOINT.SM;

  const getCurrentPaths = () =>
    isLessThanSM ? itemObject.getSMPaths() : itemObject.getMDPaths();

  const getLightboxPaths = () =>
    isLessThanSM ? itemObject.getMDPaths() : itemObject.getMainPaths();

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const openLightbox = () => {
    setIsOpen(true);
  };

  return (
    <>
      <figure>
        {getCurrentPaths().map((src) => {
          return (
            <button
              type="button"
              onClick={openLightbox}
              className={
                itemObject.isSculpture ? s.sculptureButton : s.imageButton
              }
              key={src}
            >
              <img
                src={`${src}`}
                alt={itemObject.getAltImage()}
                className={s.image}
              />
            </button>
          );
        })}
      </figure>
      {isOpen && typeof window !== 'undefined' && (
        <LightBox
          title={itemObject.title}
          images={getLightboxPaths()}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

Images.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default Images;
