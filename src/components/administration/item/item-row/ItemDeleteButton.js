import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import useSWR from 'swr';

import s from './ItemDeleteButton.module.css';
import { useAlert } from '../../../alert/Alert';
import { ALL_ITEMS_ADMIN } from '../../../../data/graphql/queries';
import {
  allItemsRequest,
  deleteItemRequest,
} from '../../../../data/request/request';

function ItemDeleteButton({ id, type }) {
  const triggerAlert = useAlert();

  const { mutate } = useSWR([ALL_ITEMS_ADMIN, type], allItemsRequest);

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const { data, error } = await deleteItemRequest(id, type);
        if (data) {
          await mutate();
          triggerAlert('Item supprimé', false);
        } else
          triggerAlert(
            error ? error.message : "Échec de la suppression de l'item",
            true,
          );
      }}
      className={`${s.command} button`}
      type="button"
    >
      <FaTrash />
    </button>
  );
}

ItemDeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemDeleteButton;
