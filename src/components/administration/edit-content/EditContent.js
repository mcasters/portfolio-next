import PropTypes from 'prop-types';

import ContentForm from './ContentForm';
import useSWR from 'swr';

import { CONTENT } from '../../../data/graphql/api/queries';
import { contentRequest } from '../../../data/graphql/api/query-graphql';

function EditContent({ keyContent, isTextArea }) {
  const { data } = useSWR([CONTENT, keyContent], contentRequest);

  return (
    <>
      {data && (
        <ContentForm
          keyContent={keyContent}
          isTextArea={isTextArea}
          initialContent={data.content.text}
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
