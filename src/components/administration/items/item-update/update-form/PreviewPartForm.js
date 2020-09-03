import s from './PreviewPartForm.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { picturesIsEmpty } from '../../../../../data/utils/itemFormUtils';

export default function PreviewPartForm({
  isSculpture,
  handleImageChange,
  deleteTempPicture,
}) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const getInitPreview = () => {
    return isSculpture ? ['', '', '', ''] : [''];
  };

  const handleUpload = (index) => (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const newPreviewUrls =
      previewUrls.length === 0 ? getInitPreview() : [...previewUrls];
    const reader = new FileReader();
    reader.onload = () => {
      newPreviewUrls[index] = reader.result;
      setPreviewUrls(newPreviewUrls);
    };
    reader.readAsDataURL(file);

    handleImageChange(index, file);
  };

  const deletePicture = (index) => (e) => {
    e.preventDefault();
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = '';
    setPreviewUrls(newPreviewUrls);

    deleteTempPicture(index);
  };

  const previews = previewUrls.map((url, index) => {
    if (url === '' && !picturesIsEmpty(previewUrls))
      return <div className={s.imagePreviewContainer}>A renseigner</div>;
    else if (url !== '')
      return (
        <div className={s.imagePreviewContainer}>
          <img
            key={`${index}button`}
            src={url}
            alt="Image formulaire"
            className={s.imagePreview}
          />
          <button key={url} className="button" onClick={deletePicture(index)}>
            Supprimer
          </button>
        </div>
      );
  });

  return (
    <>
      <div>
        <input
          className={s.uploadButton}
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={handleUpload(0)}
        />
        {isSculpture && (
          <>
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={handleUpload(1)}
            />
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={handleUpload(2)}
            />
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={handleUpload(3)}
            />
          </>
        )}
      </div>
      <>{previews}</>
    </>
  );
}

PreviewPartForm.propTypes = {
  isSculpture: PropTypes.bool.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  deleteTempPicture: PropTypes.func.isRequired,
};
