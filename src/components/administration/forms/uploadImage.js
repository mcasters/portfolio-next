import s from '../items/item-update/update-form/PreviewPartForm.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ImageInput } from './ImageInput';

export default function UploadImage({ isSculpture, onChange, onClear }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    clear();
  }, [onClear]);

  const initPreview = () => {
    return isSculpture ? ['', '', '', ''] : [''];
  };

  const onChangeHandler = (file, index) => {
    const newPreviewUrls =
      previewUrls.length === 0 ? initPreview() : [...previewUrls];

    newPreviewUrls[index] = URL.createObjectURL(file);
    setPreviewUrls(newPreviewUrls);

    onChange(index, file);
  };

  const deletePicture = (index) => (e) => {
    e.preventDefault();
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = '';
    setPreviewUrls(newPreviewUrls);

    onChange(index, '');
  };

  const clear = () => {
    setPreviewUrls(initPreview());
  };

  const previews = previewUrls.map((url, index) => {
    if (url !== '')
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
        <ImageInput onChange={onChangeHandler} onClear={onClear} index={0} />
        {isSculpture && (
          <>
            <ImageInput onChange={onChangeHandler} onClear={onClear} index={1} />
            <ImageInput onChange={onChangeHandler} onClear={onClear} index={2} />
            <ImageInput onChange={onChangeHandler} onClear={onClear} index={3} />
          </>
        )}
      </div>
      <>{previews}</>
    </>
  );
}

UploadImage.propTypes = {
  isSculpture: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.number,
};