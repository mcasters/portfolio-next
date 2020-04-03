import PropTypes from 'prop-types';
import { useState } from 'react';

import Lightbox from './ReactImageLightbox';
import LAYOUT_CONSTANTS from '../../constants/layout';
import {
  LIGHTBOX_PADDING,
  LIGHTBOX_MOBILE_PADDING,
} from '../../constants/lightbox';

export default function LightBoxProvider({ title, images, onClose }) {
  const [index, setIndex] = useState(0);
  const { length } = images;
  const isSculpture = length > 1;

  return (
    <Lightbox
      mainSrc={images[index]}
      onCloseRequest={onClose}
      nextSrc={isSculpture ? images[(index + 1) % length] : null}
      prevSrc={isSculpture ? images[(index + length - 1) % length] : null}
      onMovePrevRequest={
        isSculpture ? () => setIndex((index + length - 1) % length) : null
      }
      onMoveNextRequest={
        isSculpture ? () => setIndex((index + 1) % length) : null
      }
      imageTitle={`Marion Casters | ${title}`}
      mobileSizeBreakpoint={LAYOUT_CONSTANTS.BREAKPOINT.MD}
      imagePadding={LIGHTBOX_PADDING}
      imageMobilePadding={LIGHTBOX_MOBILE_PADDING}
      imageLoadErrorMessage="Erreur au chargement de l'image"
    />
  );
}

LightBoxProvider.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};
