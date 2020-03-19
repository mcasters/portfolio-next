import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import ContentForm from './ContentForm';
import ADD_CONTENT_MUTATION from '../../../data/graphql/queries/addContent';
import { useAlert } from '../../AlertContext/AlertContext';

function EditContent({ keyContent, content, isTextArea }) {
  const triggerAlert = useAlert();

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
      {content && (
        <ContentForm
          keyContent={keyContent}
          isTextArea={isTextArea}
          initialContent={content.text}
          mutation={addContent}
        />
      )}
    </>
  );
}

EditContent.propTypes = {
  keyContent: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  isTextArea: PropTypes.bool.isRequired,
};

export default EditContent;
