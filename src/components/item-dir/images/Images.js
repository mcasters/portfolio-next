import { useState } from 'react';
import PropTypes from 'prop-types';

import LAYOUT from '../../../constants/layout';
import ITEM from '../../../constants/itemConstant';
import LightBox from '../../react-lightbox/LightBoxProvider';
import useViewport from '../../hooks/useViewport';
import s from './Images.module.css';
import {
  getMainPaths,
  getMDPaths,
  getSMPaths,
} from '../../administration/utils/itemUtils';

function Images({ item, type }) {
  const { windowWidth } = useViewport();
  const [isOpen, setIsOpen] = useState(false);

  const isLessThanSM = windowWidth < LAYOUT.BREAKPOINT.SM;

  const getCurrentPaths = () =>
    isLessThanSM ? getSMPaths(item, type) : getMDPaths(item, type);

  const getLightboxPaths = () =>
    isLessThanSM ? getMDPaths(item, type) : getMainPaths(item, type);

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const getAltImage = () => {
    switch (type) {
      case ITEM.PAINTING.TYPE:
        return ITEM.PAINTING.IMAGE.ALT_IMAGE;
      case ITEM.DRAWING.TYPE:
        return ITEM.DRAWING.IMAGE.ALT_IMAGE;
      case ITEM.SCULPTURE.IMAGE.ALT_IMAGE:
        return ITEM.SCULPTURE.IMAGE.ALT_IMAGE;
      default:
        return;
    }
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
                type === ITEM.SCULPTURE.TYPE
                  ? s.sculptureButton
                  : s.noSculptureButton
              }
              key={src}
            >
              <img src={`${src}`} alt={getAltImage()} className={s.image} />
            </button>
          );
        })}
      </figure>
      {isOpen && typeof window !== 'undefined' && (
        <LightBox
          title={item.title}
          images={getLightboxPaths()}
          onClose={closeLightbox}
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