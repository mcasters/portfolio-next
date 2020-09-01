import React, { useEffect, useState } from 'react';
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
import {
  canSubmitData,
  getImagePreviewUrls,
  uploadTempImages,
} from '../../../utils/itemFormUtils';

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
  const [itemData, setItemData] = useState(itemObject.getItemData());
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const triggerAlert = useAlert();
  const [canSubmit, setCanSubmit] = useState(false);

  const { mutate } = useSWR([ALL_ITEMS, itemObject.type], allItemsRequest);

  const showModal = true;

  useEffect(() => {
    setCanSubmit(canSubmitData(itemData));
  }, [itemData]);

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

  const handleImageChange = async (e, index) => {
    e.preventDefault();
    const file = e.target.files[0];

    const updatedImagesPreview = await getImagePreviewUrls(
      imagePreviewUrls,
      file,
      index,
    );
    setImagePreviewUrls(updatedImagesPreview);
    setItemData(Object.assign({}, itemData, (itemData.pictures[index] = file)));
  };

  const deleteTempPictures = (e, index) => {
    e.preventDefault();
    setItemData(Object.assign({}, itemData, (itemData.pictures[index] = '')));

    const copyPreviewUrls = imagePreviewUrls;
    copyPreviewUrls[index] = '';
    setImagePreviewUrls(copyPreviewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (itemData.pictures.length > 0) await uploadTempImages(itemData);

      itemObject.updateFromItemData(itemData);
      const graphqlItem = itemObject.getGraphqlObject();

      const { data, error } = await updateItemRequest(graphqlItem);

      if (data) {
        triggerAlert(`${data.updateItem.title} modifié`, false);
        mutate();
        onClose();
      } else
        triggerAlert(
          error ? error.message : "Echec de modification de l'item",
          true,
        );
    } catch (e) {
      triggerAlert(e.message, true);
    }
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
        {itemObject.isSculpture && (
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
          {itemObject
            .getSMPaths()
            .map(
              (url, i) =>
                url !== '' && (
                  <img
                    key={`image${i}`}
                    src={url}
                    alt="Oeuvre de Marion Casters"
                    className={s.oldImagePreview}
                  />
                ),
            )}
        </div>
        <input
          key="file1"
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={(e) => handleImageChange(e, 0)}
        />
        {itemObject.isSculpture && (
          <div>
            <input
              key="file2"
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 1)}
            />
            <input
              key="file3"
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 2)}
            />
            <input
              key="file4"
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, 3)}
            />
          </div>
        )}
        {imagePreviewUrls.length > 0 && imagePreviewUrls.map(
          (url, index) =>
            url !== '' && (
              <>
                <img
                  key={`imagePreview${index}`}
                  src={url}
                  alt="Sculpture de Marion Casters"
                  className={s.imagePreview}
                />
                <button
                  key={`buttonPreview${index}`}
                  className={`${s.updateButton} button`}
                  onClick={() => deleteTempPictures(index)}
                >
                  Supprimer
                </button>
              </>
            ),
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
