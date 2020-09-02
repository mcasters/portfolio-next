import s from './PreviewPartForm.module.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function PreviewPartForm({ previewUrls, deleteTempPicture }) {
  return previewUrls.map((url, index) => {
    return (
      <div className={s.imagePreviewContainer}>
        <img
          key={`${index}button`}
          src={url}
          alt="Image formulaire"
          className={s.imagePreview}
        />
        <button key={url} className="button" onClick={deleteTempPicture(index)}>
          Supprimer
        </button>
      </div>
    );
  });
}

PreviewPartForm.propTypes = {
  previewUrls: PropTypes.array.isRequired,
  deleteTempPicture: PropTypes.func.isRequired,
};
