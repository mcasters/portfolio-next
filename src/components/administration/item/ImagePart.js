import { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import s from './imagePart.module.css';
import { ImageInput } from './ImageInput';
import Preview from './Preview';

export default function ImagePart({ isSculpture, onChange, onClear }) {
  const [previewUrls, setPreviewUrls] = useState(
    isSculpture ? ['', '', '', ''] : [''],
  );
  const ref_0 = createRef();
  const ref_1 = createRef();
  const ref_2 = createRef();
  const ref_3 = createRef();
  const inputRefs = isSculpture ? [ref_0, ref_1, ref_2, ref_3] : [ref_0];

  useEffect(() => {
    clear();
  }, [onClear]);

  const onChangeHandler = (file, index) => {
    const newPreviewUrls = [...previewUrls];

    newPreviewUrls[index] = URL.createObjectURL(file);
    setPreviewUrls(newPreviewUrls);

    onChange(index, file);
  };

  const handleOnDelete = (index) => (e) => {
    e.preventDefault();
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls[index] = '';
    setPreviewUrls(newPreviewUrls);
    inputRefs[index].current.value = '';
    onChange(index, null);
  };

  const clear = () => {
    setPreviewUrls(isSculpture ? ['', '', '', ''] : ['']);
    inputRefs.forEach((ref) => {
      ref.current.value = '';
    });
  };

  return (
    <div className={s.container}>
      <ImageInput ref={ref_0} onChange={onChangeHandler} index={0} />
      {isSculpture && (
        <>
          <ImageInput ref={ref_1} onChange={onChangeHandler} index={1} />
          <ImageInput ref={ref_2} onChange={onChangeHandler} index={2} />
          <ImageInput ref={ref_3} onChange={onChangeHandler} index={3} />
        </>
      )}
      <Preview previewUrls={previewUrls} onDelete={handleOnDelete} />
    </div>
  );
}

ImagePart.propTypes = {
  isSculpture: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.number,
};
