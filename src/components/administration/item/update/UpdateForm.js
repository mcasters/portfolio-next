import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import { useAlert } from '../../../alert/Alert';
import { fetcher } from '../../../../data/request/request';
import { canSubmitData, submitUpdateItem } from '../../../utils/formUtils';
import ImagePart from '../ImagePart';
import OldImagePart from './OldImagePart';
import DataPart from '../DataPart';
import { getItemToUpdate } from '../../../utils/itemUtils';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import CONSTANT from '../../../../constants/itemConstant';
import ButtonsPart from '../ButtonsPart';
import s from './UpdateForm.module.css';

function UpdateForm({ item, type, close }) {
  const [itemToUpdate, setItemToUpdate] = useState(getItemToUpdate(item, type));
  const triggerAlert = useAlert();
  const dialogRef = useRef();
  useOnClickOutside(dialogRef.current, close);

  const isSculpture = type === CONSTANT.SCULPTURE.TYPE;
  const canSubmit = canSubmitData(itemToUpdate, isSculpture, true);

  const { mutate } = useSWR([ALL_ITEMS_ADMIN, { type }], ([query, variables]) =>
    fetcher(query, variables),
  );

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
        error ? error.message || error : 'Sorry! something went wrong.',
        true,
      );
    } else {
      triggerAlert('Item modifié', false);
      await mutate();
      close();
    }
  };

  return (
    <form ref={dialogRef} onSubmit={handleSubmit}>
      <h1>Modification</h1>
      <div title="Close" className={s.closeButton} onClick={close} />
      <DataPart
        item={itemToUpdate}
        handleDataChange={handleDataChange}
        handleDayChange={handleDayChange}
        isSculpture={isSculpture}
      />
      <OldImagePart item={item} type={type} />
      <ImagePart isSculpture={isSculpture} onChange={handleImageChange} />
      <ButtonsPart canSubmit={canSubmit} onCancelClick={close} />
    </form>
  );
}

UpdateForm.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default UpdateForm;
