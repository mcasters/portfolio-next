import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FsLightbox from 'fslightbox-react';

import ITEM from '../../constants/item';

import {
  LIGHTBOX_MOBILE_PADDING,
  LIGHTBOX_PADDING,
} from '../../constants/lightboxConstants';
import LAYOUT_CONSTANTS from '../../constants/layout';

export default function LightBoxProvider({ title, type, srcList, toggle }) {
  const isSculpture = type === ITEM.SCULPTURE.TYPE;

  useEffect(() => {
    const lightboxNav = document.getElementsByClassName('fslightbox-nav');
    console.log('ccc : ' + lightboxNav.toString());
    if (typeof window !== 'undefined' && toggle) {
      console.log('next : ' + lightboxNav.toString());
      console.log('next2 : ' + lightboxNav.length);
      if (lightboxNav.length > 0) {
        console.log('enter : ' + lightboxNav.length);
        const tempDiv = document.createElement('div');
        tempDiv.style.backgroundColor = 'red';
        lightboxNav.item(0).insertAdjacentElement('afterbegin', tempDiv);
      }
    }
  });

  return (
    <>
      <FsLightbox toggler={toggle} sources={srcList} captions={['coucou']} />
    </>
  );
}

LightBoxProvider.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  toggle: PropTypes.bool.isRequired,
};
