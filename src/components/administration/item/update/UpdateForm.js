import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Modal from 'react-modal';

import s from './UpdateForm.module.css';
import { useAlert } from '../../../alert-context/AlertContext';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../data/request/request';
import { canSubmitData, submitUpdateItem } from '../../utils/formUtils';
import ImagePart from '../ImagePart';
import OldImagePart from './OldImagePart';
import DataPart from '../DataPart';
import { getItemToUpdate } from '../../utils/itemUtils';
import CONSTANT from '../../../../constants/itemConstant';

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
    width: '70%',
  },
};

Modal.setAppElement('#__next');

function UpdateForm({ item, type, close }) {
  const [itemUpdated, setItemUpdated] = useState(getItemToUpdate(item, type));
  const triggerAlert = useAlert();
  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  const canSubmit = canSubmitData(itemUpdated, isSculpture, true);
  const showModal = true;
  const { mutate } = useSWR([ALL_ITEMS_ADMIN, type], allItemsRequest);

  const handleCloseModal = () => {
    close();
  };

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setItemUpdated(
      Object.assign({}, itemUpdated, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  const handleDayChange = (date) => {
    setItemUpdated(Object.assign({}, itemUpdated, { date }));
  };

  const handleImageChange = (index, content) => {
    const newPictures = [...itemUpdated.pictures];
    newPictures[index] = content;
    setItemUpdated(Object.assign({}, itemUpdated, { pictures: newPictures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await submitUpdateItem(itemUpdated, type);

    if (error || !data) {
      triggerAlert(
        error.message ? error.message : 'Sorry! something went wrong.',
        true,
      );
    } else {
      triggerAlert('Item modifié', false);
      await mutate();
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
      <form className={s.formGroup} onSubmit={handleSubmit}>
        <DataPart
          item={itemUpdated}
          handleDataChange={handleDataChange}
          handleDayChange={handleDayChange}
          isSculpture={isSculpture}
        />
        <OldImagePart item={item} type={type} />
        <ImagePart isSculpture={isSculpture} onChange={handleImageChange} />
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
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default UpdateForm;