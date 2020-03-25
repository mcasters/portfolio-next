import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './ContentForm.module.css';
import { useAlert } from '../../AlertContext/AlertContext';
import { addContent } from '../../../data/lib/api';

function ContentForm({ keyContent, isTextArea, initialContent }) {
  const [isChanged, setIsChanged] = useState(false);
  const [text, setText] = useState(initialContent);
  const triggerAlert = useAlert();

  const handleChange = e => {
    e.preventDefault();
    setIsChanged(true);
    setText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await addContent({
        key: keyContent,
        text,
      });

      if (res) triggerAlert('Contenu ajouté', false);
    } catch (e) {
      triggerAlert("Erreur à l'ajout du contenu", true);
    }
  };

  return (
    <>
      <form className="formGroup" onSubmit={handleSubmit}>
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
        {isChanged && <button className={s.adminButton} type="submit">OK</button>}
      </form>
    </>
  );
}

ContentForm.propTypes = {
  keyContent: PropTypes.string.isRequired,
  isTextArea: PropTypes.bool.isRequired,
  initialContent: PropTypes.string.isRequired,
};

export default ContentForm;
