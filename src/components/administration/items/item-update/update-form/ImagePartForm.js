import s from './ImagePartForm.module.css';
import PropTypes from 'prop-types';
import React from 'react';

function ImagePartForm({ itemObject, handleImageChange }) {
  return <>
    <div className={s.oldImageContainer}>
      {itemObject
        .getSMPaths()
        .map(
          (url) =>
            url !== '' && <img
                key={url.toString()}
                src={url}
                alt="Incommensurable chef d'oeuvre de Marion Casters"
                className={s.oldImagePreview}
              />,
        )}
    </div>
    <div>
      <input
        className={s.uploadButton}
        type="file"
        accept="image/jpeg, image/jpg"
        onChange={handleImageChange(0)}
      />
      {itemObject.isSculpture && <>
          <input
            className={s.uploadButton}
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={handleImageChange(1)}
          />
          <input
            className={s.uploadButton}
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={handleImageChange(2)}
          />
          <input
            className={s.uploadButton}
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={handleImageChange(3)}
          />
        </>}
    </div>
  </>;
}

ImagePartForm.propTypes = {
  itemObject: PropTypes.object.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};

export default ImagePartForm;
