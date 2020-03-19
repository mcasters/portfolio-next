import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ItemAddForm.module.css';
import ITEM from '../../../../constants/item';
import DayPicker from '../DayPicker';
import { addItem } from '../../../../data/api';
import { useAlert } from '../../../AlertContext/AlertContext';

function ItemAddForm({ type }) {
  const triggerAlert = useAlert();
  const [itemData, setItemData] = useState({
    title: '',
    date: '',
    technique: '',
    description: '',
    length: '',
    height: '',
    width: '',
    pictures: [],
    error,
  });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const isSculpture = type === ITEM.SCULPTURE.TYPE;
  const titleForm = 'Ajout';
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );
  const canSubmit =
    (!isSculpture && haveMain && itemData.pictures.length === 1) ||
    (isSculpture && haveMain && length && itemData.pictures.length === 4);

  const clearState = () => {
    setItemData(Object.assign({}, itemData));
    setImagePreviewUrls([]);
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value, type } = e.target;

    setItemData(
      Object.assign({}, itemData, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  const handleChangeDate = date => {
    setItemData(Object.assign({}, itemData, { date: date }));
  };

  const handleImageChange = (e, index) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    const copyImagePreviewUrls = imagePreviewUrls;
    const copyPictures = itemData.pictures;

    reader.onload = () => {
      copyImagePreviewUrls.splice(index, 1, reader.result);
      copyPictures.splice(index, 1, file);

      setImagePreviewUrls(copyImagePreviewUrls);
      setItemData(Object.assign({}, itemData, { pictures: copyPictures }));
    };

    reader.readAsDataURL(file);
  };

  const buildInput = () => {
    const { length, pictures, error, ...input } = itemData;
    return isSculpture
      ? {
          ...input,
          length,
        }
      : input;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const input = buildInput();

    try {
      const res = addItem({ item: { input } });
      if (res) {
        triggerAlert('Item ajouté', false);
        clearState();
      }
    } catch (e) {
      triggerAlert(e.message, true);
    }
  };

  return (
    <div className={s.addContainer}>
      <h2>{titleForm}</h2>
      <form className="formGroup" onSubmit={handleSubmit}>
        <input
          className={s.inputL}
          placeholder="Titre"
          name="title"
          type="text"
          value={itemData.title}
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
          value={itemData.technique}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Description"
          name="description"
          type="text"
          value={itemData.description}
          onChange={handleChange}
        />
        <input
          className={s.inputL}
          placeholder="Hauteur (cm)"
          name="height"
          type="number"
          value={itemData.height}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Largeur (cm)"
          name="width"
          type="number"
          value={itemData.width}
          onChange={handleChange}
        />
        {isSculpture && (
          <input
            className={s.inputL}
            placeholder="Longueur (cm)"
            name="length"
            type="number"
            value={itemData.length}
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
};

export default ItemAddForm;
