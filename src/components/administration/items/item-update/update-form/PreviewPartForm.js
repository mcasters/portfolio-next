import s from './PreviewPartForm.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { picturesIsEmpty } from '../../../formUtils';

export default function PreviewPartForm({
  isSculpture,
  handleImageChange,
  onClear,
}) {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    clear();
  }, [onClear]);

  const getInitPreview = () => {
    return isSculpture ? ['', '', '', ''] : [''];
  };

  const getPreview = (index) => (e) => {
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

    handleImageChange(index, '');
  };

  const clear = () => {
    setPreviewUrls(getInitPreview());
  };

  const previews = previewUrls.map((url, index) => {
    if (url === '' && !picturesIsEmpty(previewUrls))
      return <div className={s.imagePreviewContainer}>A renseigner</div>;
    else if (url !== '')
      return (
        <div key={`container${index}`} className={s.imagePreviewContainer}>
          <img
            key={`img${index}`}
            src={url}
            alt="Image formulaire"
            className={s.imagePreview}
          />
          <button
            key={`button${index}`}
            className="button"
            onClick={deletePicture(index)}
          >
            Supprimer
          </button>
        </div>
      );
  });

  return (
    <>
      <div className={s.previewContainer}>
        <input
          className={s.uploadButton}
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={getPreview(0)}
        />
        {isSculpture && (
          <>
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={getPreview(1)}
            />
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={getPreview(2)}
            />
            <input
              className={s.uploadButton}
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={getPreview(3)}
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
  onClear: PropTypes.number,
};