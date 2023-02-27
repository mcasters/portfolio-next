import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import s from './AddForm.module.css';
import CONSTANT from '../../../../constants/item';
import { useAlert } from '../../../alert/Alert';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import { fetcher } from '../../../../data/request/request';
import { canSubmitData, submitAddItem } from '../../../utils/formUtils';
import DataPart from '../DataPart';
import ImagePart from '../ImagePart';
import { getEmptyItemObject } from '../../../utils/itemUtils';
import ButtonsPart from '../ButtonsPart';

function AddForm({ type }) {
  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  const titleForm = 'Ajout';

  const [onClear, setOnClear] = useState(0);
  const [item, setItem] = useState(getEmptyItemObject(type));
  const [canSubmit, setCanSubmit] = useState(false);

  const triggerAlert = useAlert();
  const { mutate } = useSWR([ALL_ITEMS_ADMIN, { type }], ([query, variables]) =>
    fetcher(query, variables),
  );
  const formRef = useRef(null);

  useEffect(() => {
    setCanSubmit(canSubmitData(item, false));
  }, [isSculpture, item]);

  const initItem = () => {
    setItem(getEmptyItemObject(type));
  };
  const handleDataChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;

    setItem(
      Object.assign({}, item, {
        [name]: type === 'number' ? parseInt(value, 10) : value,
      }),
    );
  };

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
    clear();
  };

  const clear = () => {
    initItem();
    setOnClear((prev) => prev + 1);
    formRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await submitAddItem(item);

    if (error || !data) {
      triggerAlert(error ? error : 'Sorry! something went wrong.', true);
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
        ref={formRef}
      >
        <DataPart
          item={item}
          handleDataChange={handleDataChange}
          handleDayChange={handleDayChange}
          isSculpture={isSculpture}
        />
        <ImagePart
          isSculpture={isSculpture}
          onChange={handleImageChange}
          onClear={onClear}
        />
        <ButtonsPart canSubmit={canSubmit} onCancelClick={cancel} />
      </form>
    </div>
  );
}

AddForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AddForm;
