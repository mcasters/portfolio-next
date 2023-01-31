import s from './ButtonsForm.module.css';
import PropTypes from 'prop-types';

function ButtonsForm({ canSubmit, onCancelClick }) {
  return (
    <div>
      {canSubmit && (
        <button className={`${s.formButton} button`} type="submit">
          OK
        </button>
      )}
      <button
        type="button"
        className={`${s.formButton} button`}
        onClick={onCancelClick}
      >
        Annuler
      </button>
    </div>
  );
}

ButtonsForm.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default ButtonsForm;
