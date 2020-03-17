import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import ItemList from '../ItemList/ItemList';
import ItemAddForm from '../ItemAddForm/ItemAddForm';
import ADD_ITEM_MUTATION from '../../../../data/graphql/queries/addItem';
import GET_ITEMS_QUERY from '../../../../data/graphql/queries/getAllItems';
import DELETE_ITEM from '../../../../data/graphql/queries/deleteItem';
import UPDATE_MUTATION from '../../../../data/graphql/queries/updateItem';
import { useAlert } from '../../../AlertContext/AlertContext';

export default function AdminItemParent({ type }) {
  const triggerAlert = useAlert();

  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    update(cache, { data }) {
      const { getAllItems } = cache.readQuery({
        query: GET_ITEMS_QUERY,
        variables: {
          type,
        },
      });
      cache.writeQuery({
        query: GET_ITEMS_QUERY,
        variables: {
          type,
        },
        data: { getAllItems: [...getAllItems, data.addItem] },
      });
    },
    onError(err) {
      triggerAlert(err.message, true);
    },
    onCompleted() {
      triggerAlert('Enregistré', false);
    },
  });

  const [deleteItem] = useMutation(DELETE_ITEM, {
    update(cache, { data }) {
      const { getAllItems } = cache.readQuery({
        query: GET_ITEMS_QUERY,
        variables: {
          type,
        },
      });
      const indexToDelete = getAllItems.findIndex(item => {
        return item.id === data.deleteItem;
      });
      getAllItems.splice(indexToDelete, 1);
      cache.writeQuery({
        query: GET_ITEMS_QUERY,
        variables: {
          type,
        },
        data: { getAllItems },
      });
    },
    onError(err) {
      triggerAlert(err.message, true);
    },
    onCompleted() {
      triggerAlert('Supprimé', false);
    },
  });

  const [updateItem] = useMutation(UPDATE_MUTATION, {
    onError(err) {
      triggerAlert(err.message, true);
    },

    onCompleted() {
      triggerAlert('Mis à jour', false);
    },
  });

  return (
    <>
      <ItemAddForm type={type} addMutation={addItem} />
      <ItemList
        type={type}
        deleteMutation={deleteItem}
        updateMutation={updateItem}
      />
    </>
  );
}

AdminItemParent.propTypes = {
  type: PropTypes.string.isRequired,
};
