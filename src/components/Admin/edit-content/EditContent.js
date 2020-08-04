import PropTypes from 'prop-types';

import ContentForm from './ContentForm';

function EditContent({ keyContent, content, isTextArea }) {
  return (
    <>
      {content && (
        <ContentForm
          keyContent={keyContent}
          isTextArea={isTextArea}
          initialContent={content.text}
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
