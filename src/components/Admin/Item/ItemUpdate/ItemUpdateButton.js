import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';

import UpdateForm from './UpdateForm/UpdateForm';
import s from './ItemUpdateButton.module.css';

function ItemUpdateButton({ item, type, srcList }) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const close = () => {
    setOpenUpdate(false);
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
        <UpdateForm item={item} type={type} srcList={srcList} onClose={close} />
      )}
    </>
  );
}

ItemUpdateButton.propTypes = {
  item: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
};

export default ItemUpdateButton;
