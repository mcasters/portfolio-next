import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';

import UpdateForm from '../update/UpdateForm';
import s from './ItemUpdateButton.module.css';

function ItemUpdateButton({ item, type }) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const close = () => {
    setOpenUpdate(false);
  };

  const toggle = () => {
    setOpenUpdate(!openUpdate);
  };

  return (
    <>
      <button type="button" onClick={toggle} className={`${s.command} button`}>
        <FaPen />
      </button>
      {openUpdate && <UpdateForm item={item} type={type} close={close} />}
    </>
  );
}

ItemUpdateButton.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemUpdateButton;