import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import CONSTANT from '../../../constants/itemConstant';
import s from '../items/item-update/update-form/PreviewPartForm.module.css';

export const ImageInput = ({ onChange, onClear, index }) => {
  const formRef = React.useRef(null);

  useEffect(() => {
    clear();
  }, [onClear]);

  const clear = () => formRef.current?.reset();

  const onChangeHandler = (e) => {
    if (!e.target.files?.length) return;

    onChange(e.target.files[0], index);
    clear();
  };

  return (
    <form ref={formRef}>
      <input
        className={s.uploadButton}
        type="file"
        accept="image/jpeg, image/jpg"
        multiple={false}
        name={CONSTANT.UPLOAD_NAME}
        onChange={onChangeHandler}
      />
    </form>
  );
};

ImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.number,
  index: PropTypes.number.isRequired,
};