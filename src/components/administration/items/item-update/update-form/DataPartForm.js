import s from './DataPartForm.module.css';
import DayPicker from '../../daypicker/DayPicker';
import PropTypes from 'prop-types';

function DataPartForm({
  itemData,
  handleChange,
  handleChangeDate,
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
        onChange={handleChange}
      />
      <div className={s.DayInputContainer}>
        <DayPicker onDayChange={handleChangeDate} selectedDay={itemData.date} />
      </div>
      <input
        className={s.inputL}
        placeholder="Technique"
        name="technique"
        type="text"
        value={itemData.technique}
        onChange={handleChange}
      />
      <input
        className={s.inputR}
        placeholder="Description"
        name="description"
        type="text"
        value={itemData.description}
        onChange={handleChange}
      />
      <input
        className={s.inputL}
        placeholder="Hauteur (cm)"
        name="height"
        type="number"
        value={itemData.height}
        onChange={handleChange}
      />
      <input
        className={s.inputR}
        placeholder="Largeur (cm)"
        name="width"
        type="number"
        value={itemData.width}
        onChange={handleChange}
      />
      {isSculpture && (
        <input
          className={s.inputL}
          placeholder="Longueur (cm)"
          name="length"
          type="number"
          value={itemData.length}
          onChange={handleChange}
        />
      )}
    </>
  );
}

DataPartForm.propTypes = {
  itemData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeDate: PropTypes.func.isRequired,
  isSculpture: PropTypes.bool.isRequired,
};

export default DataPartForm;
