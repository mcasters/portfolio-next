import PropTypes from 'prop-types';

export const ImageInput = ({ onChange, index }) => {
  const onChangeHandler = (e) => {
    if (!e.target.files?.length) return;
    onChange(e.target.files[0], index);
  };

  return (
      <input
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