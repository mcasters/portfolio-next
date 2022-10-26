import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Modal from 'react-modal';

import s from './UpdateForm.module.css';
import { useAlert } from '../../../../alert-context/AlertContext';
import {ALL_ITEMS, ALL_ITEMS_ADMIN} from '../../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../../data/request/request';
import {
  canSubmitData,
  submitAddOrUpdateItem,
} from '../../../itemFormUtils';
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
  const triggerAlert = useAlert();
  const isSculpture = itemObject.getIsSculpture();
  const canSubmit = canSubmitData(itemData, isSculpture, true);
  const showModal = true;
  const { mutate } = useSWR([ALL_ITEMS_ADMIN, itemObject.getType()], allItemsRequest);

  const handleCloseModal = () => {
    close();
  };

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setItemData(
      Object.assign({}, itemData, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  const handleDayChange = (date) => {
    setItemData(Object.assign({}, itemData, { date }));
  };

  const handleImageChange = (index, content) => {
    const newPictures = [...itemData.pictures];
    newPictures[index] = content;
    setItemData(Object.assign({}, itemData, { pictures: newPictures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    itemObject.updateFromItemData(itemData);
    const res = await submitAddOrUpdateItem(itemObject, itemData.pictures, true);
    triggerAlert(res.getMessage(), res.getIsError());
    if (!res.getIsError()) {
      mutate();
      close();
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
          handleDataChange={handleDataChange}
          handleDayChange={handleDayChange}
          isSculpture={isSculpture}
        />
        <ImagePartForm itemObject={itemObject} />
        <PreviewPartForm
          isSculpture={isSculpture}
          handleImageChange={handleImageChange}
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