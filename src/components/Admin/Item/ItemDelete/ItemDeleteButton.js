import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

import s from './ItemDeleteButton.module.css';
import { useAlert } from '../../../AlertContext/AlertContext';
import { deleteItem } from '../../../../data/lib/api';

function ItemDeleteButton({ id, type }) {
  const triggerAlert = useAlert();

  const handleDelete = async e => {
    e.preventDefault();
    try {
      const res = await deleteItem({ variables: { id, type } });
      if (res) triggerAlert('Item supprimé', false);
    } catch (e) {
      triggerAlert(e.message, true);
    }
  };

  return (
    <button onClick={handleDelete} className={s.command} type="button">
      <FaTrash />
    </button>
  );
}

ItemDeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemDeleteButton;
