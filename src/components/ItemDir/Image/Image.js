import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ITEM from '../../../constants/item';
import LAYOUT_CONSTANTS from '../../../constants/layoutConstants';
import LightBoxProvider from '../../LightBoxProvider';
import ItemService from '../../../app-services/ItemService';
import useViewport from "../../Hooks/useViewport";
import s from './Image.module.css';


function Image({ title, type }) {
  const { width } = useViewport();
  const [isOpen, setIsOpen] = useState(false);

  const isLessThanSM = width < LAYOUT_CONSTANTS.BREAKPOINT.SM;
  const itemService = new ItemService(type);
  const itemPath = itemService.getPath();
  const alt = itemService.getAltImage();
  const isSculpture = itemService.getIsSculpture();

  let currentImagePath;
  let largeImagePath;

  const setPath = () => {
    currentImagePath = isLessThanSM
      ? `${itemPath}/${ITEM.SM_SIZE}`
      : `${itemPath}/${ITEM.MD_SIZE}`;
    largeImagePath = isLessThanSM
      ? `${itemPath}/${ITEM.MD_SIZE}`
      : `${itemPath}`;
  };

  const getSrcList = isCurrent => {
    const list = [];
    const path = isCurrent ? `${currentImagePath}` : `${largeImagePath}`;

    if (!isSculpture) {
      list.push(`${path}/${title}.jpg`);
    } else {
      for (let i = 1; i < 5; i++) {
        list.push(`${path}/${title}_${i}.jpg`);
      }
    }
    return list;
  };

  const toggleLightBox = () => {
    setIsOpen(!isOpen);
  };

  setPath();

  const currentSrcList = getSrcList(true);
  const largeSrcList = getSrcList(false);
  return (
    <>
      <figure>
        {currentSrcList.map(src => (
          <button
            type="button"
            onClick={toggleLightBox}
            className={isSculpture ? s.sculptureButton : s.imageButton}
            key={src}
          >
            <img src={src} alt={alt} className={s.image} />
          </button>
        ))}
      </figure>
      <LightBoxProvider
        title={title}
        type={type}
        srcList={largeSrcList}
        toggler={isOpen}
      />
    </>
  );
}

Image.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Image;
