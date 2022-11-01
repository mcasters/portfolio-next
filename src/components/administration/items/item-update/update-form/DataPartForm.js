import s from './DataPartForm.module.css';
import DayPickerComponent from '../../../forms/daypicker/DayPickerComponent';
import PropTypes from 'prop-types';

function DataPartForm({
  itemData,
  handleDataChange,
  handleDayChange,
  isSculpture,
}) {
  return (
    <>
      <input
        className={s.inputL}
        placeholder="Titre"
        name="title"
        type="text"
        value={itemData.title}
        onChange={handleDataChange}
      />
      <div className={s.DayInputContainer}>
        <DayPickerComponent handleDayChange={handleDayChange} alreadyDay={itemData.date} />
      </div>
      <input
        className={s.inputL}
        placeholder="Technique"
        name="technique"
        type="text"
        value={itemData.technique}
        onChange={handleDataChange}
      />
      <input
        className={s.inputR}
        placeholder="Description"
        name="description"
        type="text"
        value={itemData.description}
        onChange={handleDataChange}
      />
      <input
        className={s.inputL}
        placeholder="Hauteur (cm)"
        name="height"
        type="number"
        value={itemData.height}
        onChange={handleDataChange}
      />
      <input
        className={s.inputR}
        placeholder="Largeur (cm)"
        name="width"
        type="number"
        value={itemData.width}
        onChange={handleDataChange}
      />
      {isSculpture && (
        <input
          className={s.inputL}
          placeholder="Longueur (cm)"
          name="length"
          type="number"
          value={itemData.length}
          onChange={handleDataChange}
        />
      )}
    </>
  );
}

DataPartForm.propTypes = {
  itemData: PropTypes.object.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  isSculpture: PropTypes.bool.isRequired,
};

export default DataPartForm;