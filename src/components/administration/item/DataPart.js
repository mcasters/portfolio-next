import s from './DataPart.module.css';
import DayPickerComponent from './daypicker/DayPickerComponent';
import PropTypes from 'prop-types';

function DataPart({ item, handleDataChange, handleDayChange, isSculpture }) {
  return (
    <>
      <input
        className={s.inputL}
        placeholder="Titre"
        name="title"
        type="text"
        value={item.title}
        onChange={handleDataChange}
      />
      <div className={s.DayInputContainer}>
        <DayPickerComponent
          handleDayChange={handleDayChange}
          alreadyDay={item.date}
        />
      </div>
      <input
        className={s.inputL}
        placeholder="Technique"
        name="technique"
        type="text"
        value={item.technique}
        onChange={handleDataChange}
      />
      <input
        className={s.inputR}
        placeholder="Description"
        name="description"
        type="text"
        value={item.description}
        onChange={handleDataChange}
      />
      <input
        className={s.inputL}
        placeholder="Hauteur (cm)"
        name="height"
        type="number"
        value={item.height}
        onChange={handleDataChange}
      />
      <input
        className={s.inputR}
        placeholder="Largeur (cm)"
        name="width"
        type="number"
        value={item.width}
        onChange={handleDataChange}
      />
      {isSculpture && (
        <input
          className={s.inputL}
          placeholder="Longueur (cm)"
          name="length"
          type="number"
          value={item.length}
          onChange={handleDataChange}
        />
      )}
    </>
  );
}

DataPart.propTypes = {
  item: PropTypes.object.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  isSculpture: PropTypes.bool.isRequired,
};

export default DataPart;
