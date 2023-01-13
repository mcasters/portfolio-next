import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import Modal from 'react-modal';

import s from './UpdateForm.module.css';
import { useAlert } from '../../../alert/Alert';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../data/request/request';
import { canSubmitData, submitUpdateItem } from '../../utils/formUtils';
import ImagePart from '../ImagePart';
import OldImagePart from './OldImagePart';
import DataPart from '../DataPart';
import { getItemToUpdate } from '../../utils/itemUtils';
import CONSTANT from '../../../../constants/itemConstant';


function UpdateForm({ item, type, close }) {
  const [itemToUpdate, setItemToUpdate] = useState(getItemToUpdate(item, type));
  const triggerAlert = useAlert();
  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  const canSubmit = canSubmitData(itemToUpdate, isSculpture, true);
  const { mutate } = useSWR([ALL_ITEMS_ADMIN, type], allItemsRequest);

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setItemToUpdate(
      Object.assign({}, itemToUpdate, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  const handleDayChange = (date) => {
    setItemToUpdate(Object.assign({}, itemToUpdate, { date }));
  };

  const handleImageChange = (index, content) => {
    const newPictures = [...itemToUpdate.pictures];
    newPictures[index] = content;
    setItemToUpdate(Object.assign({}, itemToUpdate, { pictures: newPictures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await submitUpdateItem(itemToUpdate, type);

    if (error || !data) {
      triggerAlert(
        error ?  error.message || error : 'Sorry! something went wrong.',
        true,
      );
    } else {
      triggerAlert('Item modifié', false);
      await mutate();
      close();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Modification</h1>
        <DataPart
          item={itemToUpdate}
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
            onClick={close}
          >
            Annuler
          </button>
        </div>
      </form>
    </>
  );
}

UpdateForm.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default UpdateForm;