import PropTypes from 'prop-types';

import ITEM from '../../../constants/itemConstant';
import { getAltImage } from '../../utils/itemUtils';
import s from './Images.module.css';

function ImageButton({ type, src, index, handleLightbox }) {
  const triggerLightbox = () => {
    handleLightbox(index);
  };

  return (
    <button
      type="button"
      onClick={triggerLightbox}
      className={
        type === ITEM.SCULPTURE.TYPE ? s.sculptureButton : s.noSculptureButton
      }
      key={src}
    >
      <img src={`${src}`} alt={getAltImage()} className={s.image} />
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