import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Modal from 'react-modal';

import DayPicker from '../../daypicker/DayPicker';
import ITEM_CONSTANT from '../../../../../constants/itemConstant';
import s from './UpdateForm.module.css';
import { useAlert } from '../../../../alert-context/AlertContext';
import { ALL_ITEMS } from '../../../../../data/graphql/api/queries';
import {
  allItemsRequest,
  updateItemRequest,
} from '../../../../../data/graphql/api/client-side/query-graphql';

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

function UpdateForm({ itemObject, onClose }) {
  const graphqlObject = itemObject.getGraphqlObject();
  const [itemData, setItemData] = useState({ ...graphqlObject, pictures: [] });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isTitleBlocked, setIsTitleBlocked] = useState(false);
  const triggerAlert = useAlert();

  const { mutate } = useSWR([ALL_ITEMS, itemObject.type], allItemsRequest);

  const showModal = true;

  const isSculpture = itemObject.type === ITEM_CONSTANT.SCULPTURE.TYPE;
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

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;

    setItemData(
      Object.assign({}, itemData, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  const handleChangeDate = (date) => {
    setItemData(Object.assign({}, itemData, { date }));
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
      setItemData((prevState) => ({ ...prevState, pictures: copyPictures }));
    };
    reader.readAsDataURL(file);
  };

  const ImageSubmit = async (e) => {
    e.preventDefault();

    let i = 1;
    try {
      for (const file of itemData.pictures) {
        const filename = isSculpture
          ? `${itemData.title}_${i}.jpg`
          : `${itemData.title}.jpg`;
        await fetch('/api/temp-image', {
          method: 'POST',
          headers: {
            'Content-Type': file.type,
            'X-Filename': filename,
          },
          body: file,
        }).catch((e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasImages = itemData.pictures.length > 0;
    const { pictures, ...rest } = itemData;

    const { data, error } = await updateItemRequest({
      ...rest,
      hasImages,
    });

    if (data) {
      triggerAlert(`${data.updateItem.title} modifié`, false);
      mutate();
      onClose();
    } else triggerAlert(error ? error.message : "Echec de modification de l'item", true);
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
          {itemObject.getSMPaths().map(
            (url) =>
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
          onChange={(e) => handleImageChange(e, 0)}
        />
        {isSculpture && (
          <div>
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 1)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 2)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 3)}
            />
          </div>
        )}
        {imagePreviewUrls.map(
          (url) =>
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
  itemObject: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateForm;
