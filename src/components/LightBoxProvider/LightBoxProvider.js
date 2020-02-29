import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FsLightbox from 'fslightbox-react';

import ITEM from '../../constants/item';

import {
  LIGHTBOX_MOBILE_PADDING,
  LIGHTBOX_PADDING,
} from '../../constants/lightboxConstants';
import LAYOUT_CONSTANTS from '../../constants/layoutConstants';

function LightBoxProvider({ title, type, srcList, toggle }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const close = () => {
    toggle(false);
  };

  if (type === ITEM.SCULPTURE.TYPE) {
    return (
      <>
        <FsLightbox toggler={toggle} sources={srcList} />
      </>
    );
  }

  return (
    <>
      <FsLightbox toggler={toggle} sources={srcList[0]} />
    </>
  );
}

LightBoxProvider.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default LightBoxProvider;
