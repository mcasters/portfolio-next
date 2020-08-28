import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import useSWR from 'swr';

import s from './ItemDeleteButton.module.css';
import { useAlert } from '../../../alert-context/AlertContext';
import { deleteItem } from '../../../../data/api/api';
import { ALL_ITEMS } from '../../../../data/graphql/api/queries';
import { allItemsRequest } from '../../../../data/graphql/api/query-graphql';

function ItemDeleteButton({ id, type }) {
  const triggerAlert = useAlert();

  const { mutate } = useSWR([ALL_ITEMS, type], allItemsRequest);

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        try {
          const res = await deleteItem(id, type);
          if (res) {
            mutate();
            triggerAlert('Item supprimé', false);
          }
        } catch (e) {
          triggerAlert(e.message, true);
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
