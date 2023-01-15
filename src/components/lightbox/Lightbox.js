import PropTypes from 'prop-types';
import LightboxComponent from './LightboxComponent';

export default function LightBox({ images, onClose, startIndex }) {
  const isSculpture = images.length > 1;

  return (
    <>
      {isSculpture ? (
        <LightboxComponent
          images={images}
          onClose={onClose}
          startIndex={startIndex}
        />
      ) : (
        <LightboxComponent
          image={images[0].url}
          title={images[0].title}
          onClose={onClose}
        />
      )}
    </>
  );
}

LightBox.propTypes = {
  images: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
};