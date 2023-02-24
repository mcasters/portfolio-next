import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CONT_CONST from '../../../constants/content';
import { useAlert } from '../../alert/Alert';
import ImagePart from '../item/ImagePart';
import ButtonsPart from '../item/ButtonsPart';
import { submitImageContent } from '../../utils/formUtils';
import s from './EditPictureContent.module.css';

function EditPictureForm({ pictureTitle }) {
  const [newFile, setNewFile] = useState(null);
  const [onClear, setOnClear] = useState(0);
  const formRef = useRef(null);
  const triggerAlert = useAlert();

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

  const handleImageChange = (index, file) => {
    setNewFile(file);
  };

  const clear = () => {
    setOnClear((prev) => prev + 1);
    setNewFile(null);
    formRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await submitImageContent(pictureTitle, newFile);
    if (error || !data.addPicture) {
      triggerAlert(error ? error : "Échec de l'ajout de l'image", true);
    } else {
      triggerAlert('Image ajoutée', false);
      clear();
    }
  };

  return (
    <div className={s.addContainer}>
      <h2>{pageTitle}</h2>
      <img
        className={s.image}
        src={`${CONT_CONST.CONTENT_IMAGE_PATH}/${filename}`}
        alt={
          pictureTitle === CONT_CONST.PRESENTATION_IMAGE_TITLE
            ? CONT_CONST.PRESENTATION_IMAGE_ALT
            : "Image de la page d'accueil"
        }
      />
      <form
        className="formGroup"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        ref={formRef}
      >
        <ImagePart
          isSculpture={false}
          onChange={handleImageChange}
          onClear={onClear}
        />
        <ButtonsPart canSubmit={newFile !== null} />
      </form>
    </div>
  );
}

EditPictureForm.propTypes = {
  pictureTitle: PropTypes.string.isRequired,
};

export default EditPictureForm;
