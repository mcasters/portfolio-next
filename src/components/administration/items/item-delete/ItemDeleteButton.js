import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import useSWR from 'swr';

import s from './ItemDeleteButton.module.css';
import { useAlert } from '../../../alert-context/AlertContext';
import { ALL_ITEMS } from '../../../../data/graphql/api/queries';
import {
  allItemsRequest,
  deleteItemRequest,
} from '../../../../data/graphql/api/query-graphql';

function ItemDeleteButton({ id, type }) {
  const triggerAlert = useAlert();

  const { mutate } = useSWR([ALL_ITEMS, type], allItemsRequest);

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        const { data } = await deleteItemRequest(id, type);
        if (data) {
          mutate();
          triggerAlert('Item supprimé', false);
        } else {
          triggerAlert("Erreur à la suppression de l'item", true);
        }
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
