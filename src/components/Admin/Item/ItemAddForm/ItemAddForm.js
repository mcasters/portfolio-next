import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ItemAddForm.module.css';
import ITEM from '../../../../constants/item';
import DayPicker from '../DayPicker';

const initialState = {
  title: '',
  date: '',
  technique: '',
  description: '',
  length: '',
  height: '',
  width: '',
  pictures: [],
};

function ItemAddForm({ type, addMutation }) {
  const [
    { title, date, technique, description, length, height, width, pictures },
    setState,
  ] = useState(initialState);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const isSculpture = type === ITEM.SCULPTURE.TYPE;

  const clearState = () => {
    setState({ ...initialState });
    setImagePreviewUrls([]);
  };

  const handleChange = e => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const { name, value, type } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleChangeDate = pDate => {
    setState(prevState => ({ ...prevState, date: pDate }));
  };

  const handleImageChange = (e, index) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    const pImagePreviewUrls = imagePreviewUrls;
    const pPictures = pictures;
    reader.onload = () => {
      pImagePreviewUrls.splice(index, 1, reader.result);
      pPictures.splice(index, 1, file);

      setImagePreviewUrls(pImagePreviewUrls);
      setState(prevState => ({ ...prevState, pictures: pPictures }));
    };
    reader.readAsDataURL(file);
  };

  const titleForm = 'Ajout';
  const haveMain = !!(title && date && technique && height && width);
  const canSubmit =
    (!isSculpture && haveMain && pictures.length === 1) ||
    (isSculpture && haveMain && length && pictures.length === 4);

  function buildInput() {
    const input = {
      title,
      date,
      technique,
      description,
      height,
      width,
      pictures,
      type,
    };
    return isSculpture
      ? {
          ...input,
          length,
        }
      : input;
  }

  return (
    <div className={s.addContainer}>
      <h2>{titleForm}</h2>
      <form
        className="formGroup"
        onSubmit={e => {
          e.preventDefault();
          const input = buildInput();
          addMutation({ variables: { input } }).then(res => {
            if (res) clearState();
          });
        }}
      >
        <input
          className={s.inputL}
          placeholder="Titre"
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
        />
        <div className={s.DayInputContainer}>
          <DayPicker date={date} onDayChange={handleChangeDate} />
        </div>
        <input
          className={s.inputL}
          placeholder="Technique"
          name="technique"
          type="text"
          value={technique}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Description"
          name="description"
          type="text"
          value={description}
          onChange={handleChange}
        />
        <input
          className={s.inputL}
          placeholder="Hauteur (cm)"
          name="height"
          type="number"
          value={height}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Largeur (cm)"
          name="width"
          type="number"
          value={width}
          onChange={handleChange}
        />
        {isSculpture && (
          <input
            className={s.inputL}
            placeholder="Longueur (cm)"
            name="length"
            type="number"
            value={length}
            onChange={handleChange}
          />
        )}
        <input
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={e => handleImageChange(e, 0)}
        />
        {isSculpture && (
          <div>
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 1)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 2)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 3)}
            />
          </div>
        )}
        {imagePreviewUrls.map(
          imagePreviewUrl =>
            imagePreviewUrl !== '' && (
              <img
                key={imagePreviewUrl.toString()}
                src={imagePreviewUrl}
                alt="Sculpture de Marion Casters"
                className={s.imagePreview}
              />
            ),
        )}
        {canSubmit && <button type="submit">OK</button>}
      </form>
    </div>
  );
}

ItemAddForm.propTypes = {
  type: PropTypes.string.isRequired,
  addMutation: PropTypes.func.isRequired,
};

export default ItemAddForm;
