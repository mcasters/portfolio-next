import s from './ImagePart.module.css';
import PropTypes from 'prop-types';
import React from 'react';

function ImagePart({ itemObject }) {
  return (
    <>
      <div className={s.oldImageContainer}>
        {itemObject
          .getSMPaths()
          .map(
            (url) =>
              url !== '' && (
                <img
                  key={url.toString()}
                  src={url}
                  alt="Incommensurable chef d'oeuvre de Marion Casters"
                  className={s.oldImagePreview}
                />
              ),
          )}
      </div>
    </>
  );
}

ImagePart.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default ImagePart;