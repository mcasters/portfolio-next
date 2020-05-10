import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import DayPicker from '../../DayPicker';
import ITEM_CONSTANT from '../../../../../constants/itemConstant';
import s from './UpdateForm.module.css';
import { useAlert } from '../../../../AlertContext/AlertContext';
import { updateItem } from '../../../../../data/lib/api';

const customStyles = {
  overlay: {
    backgroundColor: 'none',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxHeight: '90%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

function UpdateForm({ item, type, srcList, onClose }) {
  const [itemData, setItemData] = useState({ ...item, pictures: [] });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isTitleBlocked, setIsTitleBlocked] = useState(false);
  const triggerAlert = useAlert();

  const showModal = true;

  const isSculpture = type === ITEM_CONSTANT.SCULPTURE.TYPE;
  const haveMain = !!(
    itemData.title &&
    itemData.date &&
    itemData.technique &&
    itemData.height &&
    itemData.width
  );
  const canSubmit =
    (!isSculpture && haveMain) ||
    !!(isSculpture && haveMain && itemData.length);

  const canUpload =
    (!isSculpture && itemData.pictures.length === 1 && itemData.title !== '') ||
    (isSculpture && itemData.pictures.length === 4 && itemData.title !== '');

  const handleCloseModal = () => {
    onClose();
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setItemData(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleChangeDate = date => {
    setItemData(prevState => ({ ...prevState, date }));
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
      setItemData(prevState => ({ ...prevState, pictures: copyPictures }));
    };
    reader.readAsDataURL(file);
  };

  const ImageSubmit = async e => {
    e.preventDefault();

    let i = 1;
    try {
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
    } catch (e) {
      triggerAlert(e.message, true);
    }

    setIsTitleBlocked(true);
    triggerAlert('image(s) ajoutée(s)', false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const hasImages = itemData.pictures.length > 0;
    const { pictures, ...rest } = itemData;
    updateItem({ ...rest, hasImages, type }).then(res => {
      if (res) {
        triggerAlert('Item modifié', false);
        onClose();
      } else triggerAlert("Modification de l'item impossible", true);
    }).catch(err => {
      triggerAlert(`Erreur de modification de l'item : ${err.message}`, true);
    });
  };

  return (
    <Modal
      id="updateItem"
      contentLabel="Modification"
      isOpen={showModal}
      closeTimeoutMS={150}
      style={customStyles}
    >
      <h1 className={s.updateTitle}>Modification</h1>
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
          <DayPicker onDayChange={handleChangeDate} />
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
        <div className={s.oldImageContainer}>
          {srcList.map(
            url =>
              url !== '' && (
                <img
                  key={url.toString()}
                  src={url}
                  alt="Oeuvre de Marion Casters"
                  className={s.oldImagePreview}
                />
              ),
          )}
        </div>
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
          url =>
            url !== '' && (
              <img
                key={url.toString()}
                src={url}
                alt="Sculpture de Marion Casters"
                className={s.imagePreview}
              />
            ),
        )}
        {canUpload && (
          <button className={`${s.updateButton} button`} onClick={ImageSubmit}>
            Enregister les images
          </button>
        )}
        <div>
          {canSubmit && (
            <button className={`${s.updateButton} button`} type="submit">
              OK
            </button>
          )}
          <button
            type="button"
            className={`${s.updateButton} button`}
            onClick={handleCloseModal}
          >
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
}

UpdateForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    technique: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateForm;
