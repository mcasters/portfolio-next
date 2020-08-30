import PropTypes from 'prop-types';
import useSWR from 'swr';
import { useState } from 'react';

import { CONTENT } from '../../../data/graphql/api/queries';
import {
  addContentRequest,
  contentRequest,
} from '../../../data/graphql/api/query-graphql';
import { useAlert } from '../../alert-context/AlertContext';
import s from './EditContent.module.css';

function EditContent({ keyContent, isTextArea }) {
  const [isChanged, setIsChanged] = useState(false);
  const [text, setText] = useState('');
  const triggerAlert = useAlert();

  const { data, mutate } = useSWR([CONTENT, keyContent], contentRequest);

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
            mutate();
            triggerAlert('Contenu ajouté', false);
          } else {
            triggerAlert(
              error ? error.message : 'Echec de modification du contenu',
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
            value={data && data.content ? data.content.text : text}
            onChange={handleChange}
          />
        )}
        {isTextArea && (
          <textarea
            className={s.textarea}
            placeholder={keyContent}
            name="textarea"
            value={data && data.content ? data.content.text : text}
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
