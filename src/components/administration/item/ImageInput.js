import { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const ImageInput = forwardRef(({ onChange, index }, ref) => {
  const onChangeHandler = (e) => {
    if (!e.target.files?.length) return;
    onChange(e.target.files[0], index);
  };

  return (
    <input
      ref={ref}
      type="file"
      accept="image/jpeg, image/jpg"
      multiple={false}
      onChange={onChangeHandler}
    />
  );
});

ImageInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
