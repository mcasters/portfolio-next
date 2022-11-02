import s from '../items/item-update/update-form/PreviewPartForm.module.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ImageInput } from './ImageInput';
import Preview from './Preview';

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

  const handleOnDelete = (index) => (e) => {
    e.preventDefault();
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = '';
    setPreviewUrls(newPreviewUrls);

    onChange(index, '');
  };

  const clear = () => {
    setPreviewUrls(initPreview());
  };

  return (
    <div className={s.inputContainer}>
      <ImageInput onChange={onChangeHandler} onClear={onClear} index={0} />
      {isSculpture && (
        <>
          <ImageInput onChange={onChangeHandler} index={1} />
          <ImageInput onChange={onChangeHandler} index={2} />
          <ImageInput onChange={onChangeHandler} index={3} />
        </>
      )}
      <Preview previewUrls={previewUrls} onDelete={handleOnDelete} />
    </div>
  );
}

UploadImage.propTypes = {
  isSculpture: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.number,
};