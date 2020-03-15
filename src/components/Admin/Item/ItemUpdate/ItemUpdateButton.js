import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';

import UpdateForm from './UpdateForm/UpdateForm';
import s from './ItemUpdateButton.module.css';

function ItemUpdateButton({ item, type, srcList, updateMutation, refetch }) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const getResult = isError => {
    if (!isError) setOpenUpdate(false);
    refetch();
  };

  const toggle = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <>
      <button type="button" onClick={toggle} className={s.command}>
        <FaPen />
      </button>
      {openUpdate && (
        <UpdateForm
          item={item}
          type={type}
          srcList={srcList}
          updateMutation={updateMutation}
          onResult={getResult}
        />
      )}
    </>
  );
}

ItemUpdateButton.propTypes = {
  item: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  updateMutation: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ItemUpdateButton;
