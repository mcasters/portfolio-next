import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Modal from 'react-modal';

import s from './UpdateForm.module.css';
import { useAlert } from '../../../../alert-context/AlertContext';
import { ALL_ITEMS } from '../../../../../data/graphql/api/queries';
import {
  allItemsRequest,
  updateItemRequest,
} from '../../../../../data/graphql/api/client-side/query-graphql';
import { canSubmitData, uploadTempImages } from '../../../utils/itemFormUtils';
import PreviewPartForm from './PreviewPartForm';
import ImagePartForm from './ImagePartForm';
import DataPartForm from './DataPartForm';

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

function UpdateForm({ itemObject, close }) {
  const [itemData, setItemData] = useState(itemObject.getItemData());
  const [previewUrls, setPreviewUrls] = useState([]);
  const triggerAlert = useAlert();
  const isSculpture = itemObject.isSculpture;
  const canSubmit = canSubmitData(itemData, isSculpture);
  const showModal = true;
  const { mutate } = useSWR([ALL_ITEMS, itemObject.type], allItemsRequest);

  const handleCloseModal = () => {
    close();
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

  const handleImageChange = (i) => (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const newPreviewUrls = [...previewUrls];
    const reader = new FileReader();
    reader.onload = () => {
      newPreviewUrls[i] = reader.result;
      setPreviewUrls(newPreviewUrls);
    };
    reader.readAsDataURL(file);

    const newPictures = [...itemData.pictures];
    newPictures[i] = file;
    setItemData(Object.assign({}, itemData, { pictures: newPictures }));
  };

  const deleteTempPicture = (i) => (e) => {
    e.preventDefault();

    const newPreviewUrls = [...previewUrls];
    const newPictures = [...itemData.pictures];
    newPreviewUrls[i] = '';
    newPictures[i] = '';
    setPreviewUrls(newPreviewUrls);
    setItemData(Object.assign({}, itemData, { pictures: newPictures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadTempImages(itemData, isSculpture);

      itemObject.updateFromItemData(itemData);
      const graphqlItem = itemObject.getGraphqlObject();

      const { data, error } = await updateItemRequest(graphqlItem);

      if (data) {
        triggerAlert(`${data.updateItem.title} modifié`, false);
        mutate();
        close();
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
        <DataPartForm
          itemData={itemData}
          handleChange={handleChange}
          handleChangeDate={handleChangeDate}
          isSculpture={isSculpture}
        />
        <ImagePartForm
          itemObject={itemObject}
          handleImageChange={handleImageChange}
        />
        <PreviewPartForm
          previewUrls={previewUrls}
          deleteTempPicture={deleteTempPicture}
        />
        <div>
          {canSubmit && (
            <button className="button" type="submit">
              OK
            </button>
          )}
          <button
            type="button"
            className={`${s.cancelButton} button`}
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
  close: PropTypes.func.isRequired,
};

export default UpdateForm;
