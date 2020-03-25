import React, { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ItemAddForm.module.css';
import ITEM from '../../../../constants/item';
import DayPicker from '../DayPicker';
import { addItem } from '../../../../data/lib/api';
import { useAlert } from '../../../AlertContext/AlertContext';

function ItemAdd({ type }) {
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
    error: '',
  });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isTitleBlocked, setIsTitleBlocked] = useState(false);

  const isSculpture = type === ITEM.SCULPTURE.TYPE;
  const titleForm = 'Ajout';
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );
  const canUpload =
    (!isSculpture && itemData.pictures.length === 1 && itemData.title !== '') ||
    (isSculpture && itemData.pictures.length === 4 && itemData.title !== '');
  const canSubmit =
    (!isSculpture && haveMain && itemData.pictures.length === 1) ||
    (isSculpture &&
      haveMain &&
      itemData.length &&
      itemData.pictures.length === 4);

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
    setItemData(Object.assign({}, itemData, { date: date.toString() }));
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

  const ImageSubmit = async e => {
    e.preventDefault();

    let i = 1;
    for (const file of itemData.pictures) {
      const filename = isSculpture
        ? `${itemData.title}_${i}.jpg`
        : `${itemData.title}.jpg`;
      await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          'Content-Filename': filename,
        },
        body: file,
      }).catch(e => {
        triggerAlert(e.message, true);
      });
      i++;
    }
    setIsTitleBlocked(true);
    triggerAlert('image(s) ajoutée(s)', false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { pictures, error, length, ...withoutLength } = itemData;
    const item = isSculpture ? { length, ...withoutLength } : withoutLength;

    try {
      const res = addItem({ ...item, hasImages: true, type });
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
          readOnly={isTitleBlocked}
        />
        <div className={s.DayInputContainer}>
          <DayPicker date={itemData.date} onDayChange={handleChangeDate} />
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
        {canUpload && (
          <button className={s.adminButton} onClick={ImageSubmit}>
            Enregister les images
          </button>
        )}
        {canSubmit && <button className={s.adminButton} type="submit">OK</button>}
      </form>
    </div>
  );
}

ItemAdd.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ItemAdd;
