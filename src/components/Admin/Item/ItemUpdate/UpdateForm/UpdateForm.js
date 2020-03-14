import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import DayPicker from '../../DayPicker';
import ITEM from '../../../../../constants/item';
import s from './UpdateForm.module.css';

const customStyles = {
  overlay: {
    backgroundColor: 'none',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxHeight: '90%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

function UpdateForm({ item, type, srcList, updateMutation, onResult }) {
  // eslint-disable-next-line react/prop-types
  const { id, __typename, ...rest } = item;
  const [input, setInput] = useState({ ...rest, pictures: [] });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const showModal = true;

  const handleCloseModal = () => {
    onResult(false);
  };

  const handleResult = isError => {
    onResult(isError);
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleChangeDate = d => {
    setInput(prevState => ({ ...prevState, date: d }));
  };

  const handleImageChange = (e, index) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    const pImagePreviewUrls = imagePreviewUrls;
    const pPictures = input.pictures;
    reader.onload = () => {
      pImagePreviewUrls.splice(index, 1, reader.result);
      pPictures.splice(index, 1, file);

      setImagePreviewUrls(pImagePreviewUrls);
      setInput(prevState => ({ ...prevState, pictures: pPictures }));
    };
    reader.readAsDataURL(file);
  };

  const isSculpture = type === ITEM.SCULPTURE.TYPE;
  const haveMain = !!(
    input.title &&
    input.date &&
    input.technique &&
    input.height &&
    input.width
  );
  const canSubmit =
    (!isSculpture && haveMain) || !!(isSculpture && haveMain && input.length);

  return (
    <Modal
      id="updateItem"
      contentLabel="Modification"
      isOpen={showModal}
      closeTimeoutMS={150}
      style={customStyles}
    >
      <h1 className={s.updateTitle}>Modification</h1>
      <form
        className="formGroup"
        onSubmit={e => {
          e.preventDefault();
          updateMutation({ variables: { id, item: { ...input, type } } }).then(
            res => {
              const isError = res === undefined;
              handleResult(isError);
            },
          );
        }}
      >
        <input
          className={s.inputL}
          placeholder="Titre"
          name="title"
          type="text"
          value={input.title}
          onChange={handleChange}
        />
        <div className={s.DayInputContainer}>
          <DayPicker date={input.date} onDayChange={handleChangeDate} />
        </div>
        <input
          className={s.inputL}
          placeholder="Technique"
          name="technique"
          type="text"
          value={input.technique}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Description"
          name="description"
          type="text"
          value={input.description}
          onChange={handleChange}
        />
        <input
          className={s.inputL}
          placeholder="Hauteur (cm)"
          name="height"
          type="number"
          value={input.height}
          onChange={handleChange}
        />
        <input
          className={s.inputR}
          placeholder="Largeur (cm)"
          name="width"
          type="number"
          value={input.width}
          onChange={handleChange}
        />
        {isSculpture && (
          <input
            className={s.inputL}
            placeholder="Longueur (cm)"
            name="length"
            type="number"
            value={input.length}
            onChange={handleChange}
          />
        )}
        <div className={s.oldImageContainer}>
          {srcList.map(
            url =>
              url !== '' && (
                <img
                  key={url.toString()}
                  src={url}
                  alt="Oeuvre de Marion Casters"
                  className={s.oldImagePreview}
                />
              ),
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg, image/jpg"
          onChange={e => handleImageChange(e, 0)}
        />
        {isSculpture && (
          <div>
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 1)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 2)}
            />
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={e => handleImageChange(e, 3)}
            />
          </div>
        )}
        {imagePreviewUrls.map(
          url =>
            url !== '' && (
              <img
                key={url.toString()}
                src={url}
                alt="Sculpture de Marion Casters"
                className={s.imagePreview}
              />
            ),
        )}
        {canSubmit && (
          <button className={s.updateDialogButton} type="submit">
            OK
          </button>
        )}
        <button
          type="button"
          className={s.updateDialogButton}
          onClick={handleCloseModal}
        >
          Annuler
        </button>
      </form>
    </Modal>
  );
}

UpdateForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    technique: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    length: PropTypes.number,
  }).isRequired,
  type: PropTypes.string.isRequired,
  srcList: PropTypes.array.isRequired,
  updateMutation: PropTypes.func.isRequired,
  onResult: PropTypes.func.isRequired,
};

export default UpdateForm;
