import s from './ImagePartForm.module.css';
import PropTypes from 'prop-types';
import React from 'react';

function ImagePartForm({ itemObject }) {
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

ImagePartForm.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default ImagePartForm;
