import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';

import GET_CONTENT from '../../../data/graphql/queries/getContent';
import ContentForm from './ContentForm';
import ADD_CONTENT_MUTATION from '../../../data/graphql/queries/addContent';
import { useAlert } from '../../AlertContext/AlertContext';

function EditContent({ keyContent, isTextArea }) {
  const triggerAlert = useAlert();
  const { data } = useQuery(GET_CONTENT, {
    variables: { key: keyContent },
    ssr: true,
  });

  const [addContent] = useMutation(ADD_CONTENT_MUTATION, {
    onError(err) {
      triggerAlert(err.message, true);
    },
    onCompleted() {
      triggerAlert('Enregistré', false);
    },
  });

  return (
    <>
      {data && data.getContent && (
        <ContentForm
          keyContent={keyContent}
          isTextArea={isTextArea}
          initialContent={data.getContent.text}
          mutation={addContent}
        />
      )}
    </>
  );
}

EditContent.propTypes = {
  keyContent: PropTypes.string.isRequired,
  isTextArea: PropTypes.bool.isRequired,
};

export default EditContent;
