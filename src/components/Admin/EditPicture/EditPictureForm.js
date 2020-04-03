import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './EditPictureForm.module.css';
import CONT_CONST from '../../../constants/content';
import { useAlert } from '../../AlertContext/AlertContext';
import {addPicture} from "../../../data/lib/api";

function EditPictureForm({ pictureTitle }) {
  const triggerAlert = useAlert();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState('');

  const getInfos = () => {
    let pageTitle;
    let filename;
    switch (pictureTitle) {
      case CONT_CONST.HOME_IMAGE_PORTRAIT:
        pageTitle = 'Format portrait';
        filename = CONT_CONST.HOME_IMAGE_PORTRAIT_FILENAME;
        break;
      case CONT_CONST.HOME_IMAGE_LANDSCAPE:
        pageTitle = 'Format paysage';
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

  const handleImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const f = e.target.files[0];

    reader.onload = () => {
      setImagePreviewUrl(reader.result);
      setFile(f);
    };
    reader.readAsDataURL(f);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': file.type,
        'Content-Filename': filename,
      },
      body: file,
    })
      .catch(e => {
        triggerAlert(e.message, true);
      })
      .then(() => {
        const res = addPicture(pictureTitle);
        if (res) {
          triggerAlert('image ajoutée', false);
          setImagePreviewUrl('');
          setFile('');
        } else {
          triggerAlert("Erreur à l'ajout de l'image", true);
        }
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
        <label className={s.fileLabel}>
          Choisir un fichier
          <input
            name="add-file"
            className={s.fileButton}
            type="file"
            accept="image/jpg, image/jpeg"
            onChange={e => handleImageChange(e)}
          />
        </label>
        {imagePreviewUrl !== '' && (
          <img
            key={imagePreviewUrl.toString()}
            src={imagePreviewUrl}
            alt="Oeuvre de Marion Casters"
            className={s.imagePreview}
          />
        )}
        {file && (
          <button className={s.adminButton} type="submit">
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
