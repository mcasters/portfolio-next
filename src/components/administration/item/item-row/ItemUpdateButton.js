import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';

import UpdateForm from '../update/UpdateForm';
import s from './ItemUpdateButton.module.css';

function ItemUpdateButton({ itemObject }) {
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
      {openUpdate && <UpdateForm itemObject={itemObject} close={close} />}
    </>
  );
}

ItemUpdateButton.propTypes = {
  itemObject: PropTypes.object.isRequired,
};

export default ItemUpdateButton;