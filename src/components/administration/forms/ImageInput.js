import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import CONSTANT from '../../../constants/itemConstant';
import s from '../items/item-update/update-form/PreviewPartForm.module.css';

export const ImageInput = ({ onChange, index }) => {

  const onChangeHandler = (e) => {
    if (!e.target.files?.length) return;
    onChange(e.target.files[0], index);
  };

  return (
      <input
        className={s.uploadButton}
        type="file"
        accept="image/jpeg, image/jpg"
        multiple={false}
        onChange={onChangeHandler}
      />
  );
};

ImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};