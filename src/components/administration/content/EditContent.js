import PropTypes from 'prop-types';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

import { CONTENT } from '../../../data/graphql/queries';
import { addContentRequest, fetcher } from '../../../data/request/request';
import { useAlert } from '../../alert/Alert';
import s from './EditContent.module.css';

function EditContent({ keyContent, isTextArea }) {
  const triggerAlert = useAlert();
  const { data, mutate } = useSWR(
    [CONTENT, { key: keyContent }],
    ([query, variables]) => fetcher(query, variables),
  );

  const [isChanged, setIsChanged] = useState(false);
  const [text, setText] = useState(
    data && data.content ? data.content.text : '',
  );

  useEffect(() => {
    if (data && data.content) setText(data.content.text);
  }, [data]);

  const handleChange = (e) => {
    setIsChanged(true);
    setText(e.target.value);
  };

  return (
    <>
      <form
        className="formGroup"
        onSubmit={async (e) => {
          e.preventDefault();
          const { data, error } = await addContentRequest(keyContent, text);
          if (data) {
            setIsChanged(false);
            await mutate();
            triggerAlert('Contenu ajouté', false);
          } else {
            triggerAlert(
              error ? error.message : 'Échec de modification du contenu',
              true,
            );
          }
        }}
      >
        {!isTextArea && (
          <input
            placeholder={keyContent}
            name="text"
            type="text"
            value={text}
            onChange={handleChange}
          />
        )}
        {isTextArea && (
          <textarea
            className={s.textarea}
            placeholder={keyContent}
            name="textarea"
            value={text}
            onChange={handleChange}
          />
        )}
        {isChanged && (
          <button className={`${s.adminButton} button`} type="submit">
            OK
          </button>
        )}
      </form>
    </>
  );
}

EditContent.propTypes = {
  keyContent: PropTypes.string.isRequired,
  isTextArea: PropTypes.bool.isRequired,
};

export default EditContent;
