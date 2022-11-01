import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import s from './ItemAdd.module.css';
import CONSTANT from '../../../../constants/itemConstant';
import { useAlert } from '../../../alert-context/AlertContext';
import { ALL_ITEMS } from '../../../../data/graphql/queries';
import { allItemsRequest } from '../../../../data/request/request';
import { canSubmitData, submitAddOrUpdateItem } from '../../formUtils';
import ItemObject from '../../../../utils/ItemObject';
import DataPartForm from '../item-update/update-form/DataPartForm';
import UploadImage from '../../forms/uploadImage';

function ItemAdd({ type }) {
  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  const titleForm = 'Ajout';
  let itemObject = new ItemObject(null, type);

  const triggerAlert = useAlert();
  const [onClear, setOnClear] = useState(0);
  const [item, setItem] = useState(itemObject.getItemData());
  const [canSubmit, setCanSubmit] = useState(false);
  const { mutate } = useSWR([ALL_ITEMS, type], allItemsRequest);

  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;

    setItem(
      Object.assign({}, item, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

  useEffect(() => {
    setCanSubmit(canSubmitData(item, isSculpture, false));
  }, [item]);

  const handleDayChange = (date) => {
    setItem(Object.assign({}, item, { date }));
  };

  const handleImageChange = (index, file) => {
    const newPictures = [...item.pictures];
    newPictures[index] = file;
    setItem(Object.assign({}, item, { pictures: newPictures }));
  };

  const cancel = async (e) => {
    e.preventDefault();
    setItem(itemObject.getItemData());
    setOnClear((prev) => prev + 1);
  };

  const clear = () => {
    itemObject = new ItemObject(null, type);
    setItem(itemObject.getItemData());
    setOnClear((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    itemObject.updateFromItem(item);

    const { data, error } = await submitAddOrUpdateItem(
      itemObject,
      item.pictures,
      false,
    );

    if (error || !data) {
      triggerAlert(error ? error.message : 'Sorry! something went wrong.', true);
    } else {
      triggerAlert('Item ajouté', false);
      await mutate();
      clear();
    }
  };

  return (
    <div className={s.addContainer}>
      <h2>{titleForm}</h2>
      <form
        className="formGroup"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <DataPartForm
          itemData={item}
          handleDataChange={handleDataChange}
          handleDayChange={handleDayChange}
          isSculpture={isSculpture}
        />
        <UploadImage
          isSculpture={isSculpture}
          onChange={handleImageChange}
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