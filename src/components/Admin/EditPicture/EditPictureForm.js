import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './EditPictureForm.module.css';
import CONT_CONST from '../../../constants/content';
import { useAlert } from '../../AlertContext/AlertContext';
import { addPicture } from '../../../data/api';

function EditPictureForm({ pictureTitle }) {
  const triggerAlert = useAlert();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState('');

  const setProps = title => {
    let adminTitle;
    let filename;
    switch (title) {
      case CONT_CONST.HOME_IMAGE_PORTRAIT:
        adminTitle = 'Format portrait';
        filename = CONT_CONST.HOME_IMAGE_PORTRAIT_FILE;
        break;
      case CONT_CONST.HOME_IMAGE_LANDSCAPE:
        adminTitle = 'Format paysage';
        filename = CONT_CONST.HOME_IMAGE_LANDSCAPE_FILE;
        break;
      default:
        adminTitle = '';
        filename = CONT_CONST.PRESENTATION_IMAGE_FILE;
    }
    return {
      adminTitle,
      filename,
    };
  };

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

  const { adminTitle, filename } = setProps(pictureTitle);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await addPicture({
        picture: file,
        pictureTitle,
      });

      if (res) {
        triggerAlert('Image ajouté', false);
        setImagePreviewUrl('');
        setFile('');
      }
    } catch (e) {
      triggerAlert(e.message, true);
    }
  };

  return (
    <div className={s.addContainer}>
      <h2 className={s.title}>{adminTitle}</h2>
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
        {file && <button type="submit">OK</button>}
      </form>
    </div>
  );
}

EditPictureForm.propTypes = {
  pictureTitle: PropTypes.string.isRequired,
};

export default EditPictureForm;
