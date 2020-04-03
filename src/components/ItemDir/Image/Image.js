import { useState } from 'react';
import PropTypes from 'prop-types';

import ITEM from '../../../constants/item';
import CONSTANT from '../../../constants/layout';
import LightBoxProvider from '../../LightBoxProvider';
import ItemService from '../../../app-services/ItemService';
import useViewport from '../../Hooks/useViewport';
import s from './Image.module.css';

function Image({ title, type }) {
  const { width } = useViewport();
  const [isOpen, setIsOpen] = useState(false);

  const isLessThanSM = width < CONSTANT.BREAKPOINT.SM;
  const itemService = new ItemService(type);
  const itemPath = itemService.getPath();
  const alt = itemService.getAltImage();
  const isSculpture = itemService.getIsSculpture();

  const getCurrentPath = () => {
    return isLessThanSM
      ? `${itemPath}/${ITEM.SM_SIZE}`
      : `${itemPath}/${ITEM.MD_SIZE}`;
  };

  const getLightboxPath = () => {
    return isLessThanSM ? `${itemPath}/${ITEM.MD_SIZE}` : `${itemPath}`;
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const openLightbox = () => {
    setIsOpen(true);
  };

  const getImageList = isForLightbox => {
    const path = isForLightbox ? getLightboxPath() : getCurrentPath();

    if (!isSculpture) {
      return [`${path}/${title}.jpg`];
    } else {
      let i;
      let list = [];

      for (i = 1; i < 5; i++) {
        list.push(`${path}/${title}_${i}.jpg`);
      }
      return list;
    }
  };

  return (
    <>
      <figure>
        {getImageList(false).map(src => (
          <button
            type="button"
            onClick={openLightbox}
            className={isSculpture ? s.sculptureButton : s.imageButton}
            key={src}
          >
            <img src={src} alt={alt} className={s.image} />
          </button>
        ))}
      </figure>
      {isOpen && typeof window !== 'undefined' && (
        <LightBoxProvider
          title={title}
          images={getImageList(true)}
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
