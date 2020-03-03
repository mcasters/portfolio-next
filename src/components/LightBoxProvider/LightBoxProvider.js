import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FsLightbox from 'fslightbox-react';

import ITEM from '../../constants/item';

import {
  LIGHTBOX_MOBILE_PADDING,
  LIGHTBOX_PADDING,
} from '../../constants/lightboxConstants';
import LAYOUT_CONSTANTS from '../../constants/layoutConstants';

export default function LightBoxProvider({ title, type, srcList, toggler }) {
  const isSculpture = type === ITEM.SCULPTURE.TYPE;

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={srcList}
        captions={['coucou']}
      />
    </>
  );
}

LightBoxProvider.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  toggler: PropTypes.bool.isRequired,
};
