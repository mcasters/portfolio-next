import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import s from './ItemAdd.module.css';
import ITEM from '../../../../constants/itemConstant';
import { useAlert } from '../../../alert-context/AlertContext';
import { ALL_ITEMS } from '../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../data/request/request';
import { canSubmitData, submitAddOrUpdateItem } from '../../itemFormUtils';
import ItemObject from '../../../../utils/ItemObject';
import DataPartForm from '../item-update/update-form/DataPartForm';
import PreviewPartForm from '../item-update/update-form/PreviewPartForm';

function ItemAdd({ type }) {
  const isSculpture = type === ITEM.SCULPTURE.TYPE;
  const titleForm = 'Ajout';
  let itemObject = new ItemObject(null, type);

  const triggerAlert = useAlert();
  const [onClear, setOnClear] = useState(0);
  const [itemData, setItemData] = useState(itemObject.getItemData());
  const { mutate } = useSWR([ALL_ITEMS, type], allItemsRequest);

  const canSubmit = canSubmitData(itemData, isSculpture, false);

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

  const cancel = async (e) => {
    e.preventDefault();
    setItemData(itemObject.getItemData());
    setOnClear((prev) => prev + 1);
  };

  const clear= () => {
    itemObject = new ItemObject(null, type);
    setItemData(itemObject.getItemData());
    setOnClear((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    itemObject.updateFromItemData(itemData);
    const res = await submitAddOrUpdateItem(
      itemObject,
      itemData.pictures,
      false,
    );
    triggerAlert(res.getMessage(), res.getIsError());
    if (!res.getIsError()) {
      mutate();
      clear();
    }
  };

  return (
    <div className={s.addContainer}>
      <h2>{titleForm}</h2>
      <form className="formGroup" onSubmit={handleSubmit}>
        <DataPartForm
          itemData={itemData}
          handleDataChange={handleDataChange}
          handleDayChange={handleDayChange}
          isSculpture={isSculpture}
        />
        <PreviewPartForm
          isSculpture={isSculpture}
          handleImageChange={handleImageChange}
          onClear={onClear}
        />
        <div>
          {canSubmit && (
            <button className={`${s.adminButton} button`} type="submit">
              OK
            </button>
          )}
          <button
            type="button"
            className={`${s.adminButton} button`}
            onClick={cancel}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

ItemAdd.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ItemAdd;