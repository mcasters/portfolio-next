import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './EditPictureForm.module.css';
import CONT_CONST from '../../../constants/content';
import { useAlert } from '../../alert-context/AlertContext';
import { addPictureRequest } from '../../../data/graphql/api/client-side/query-graphql';

function EditPictureForm({ pictureTitle }) {
  const triggerAlert = useAlert();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState('');

  const getInfos = () => {
    let pageTitle;
    let filename;
    switch (pictureTitle) {
      case CONT_CONST.HOME_IMAGE_PORTRAIT:
        pageTitle = 'Format portrait (écran mobile)';
        filename = CONT_CONST.HOME_IMAGE_PORTRAIT_FILENAME;
        break;
      case CONT_CONST.HOME_IMAGE_LANDSCAPE:
        pageTitle = 'Format paysage (écran ordinateur)';
        filename = CONT_CONST.HOME_IMAGE_LANDSCAPE_FILENAME;
        break;
      default:
        pageTitle = '';
        filename = CONT_CONST.PRESENTATION_IMAGE_FILENAME;
    }
    return {
      pageTitle,
      filename,
    };
  };

  const { pageTitle, filename } = getInfos();

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const f = e.target.files[0];

    reader.onload = () => {
      setImagePreviewUrl(reader.result);
      setFile(f);
    };
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('api/temp-image', {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'X-Filename': filename,
      },
      body: file,
    })
      .catch((e) => {
        triggerAlert(e.message, true);
      })
      .then(async () => {
        const { data, error } = await addPictureRequest(pictureTitle);
        if (data) {
          triggerAlert('image ajoutée', false);
          setImagePreviewUrl('');
          setFile('');
        } else
          triggerAlert(
            error ? error.message : "Echec de l'ajout de l'image",
            true,
          );
      });
  };

  return (
    <div className={s.addContainer}>
      <h2 className={s.title}>{pageTitle}</h2>
      <img
        className={s.image}
        src={`${CONT_CONST.CONTENT_IMAGE_PATH}/${filename}`}
        alt={
          pictureTitle === CONT_CONST.PRESENTATION_IMAGE_TITLE
            ? CONT_CONST.PRESENTATION_IMAGE_ALT
            : CONT_CONST.HOME_IMAGE_ALT
        }
      />
      <form className="formGroup" onSubmit={handleSubmit}>
        <button className="button">
          <label>
            Choisir un fichier
            <input
              name="add-file"
              className={s.fileButton}
              type="file"
              accept="image/jpg, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        </button>
        {imagePreviewUrl !== '' && (
          <img
            key={imagePreviewUrl.toString()}
            src={imagePreviewUrl}
            alt="Oeuvre de Marion Casters"
            className={s.imagePreview}
          />
        )}
        {file && (
          <button className={`${s.adminButton} button`} type="submit">
            OK
          </button>
        )}
      </form>
    </div>
  );
}

EditPictureForm.propTypes = {
  pictureTitle: PropTypes.string.isRequired,
};

export default EditPictureForm;
