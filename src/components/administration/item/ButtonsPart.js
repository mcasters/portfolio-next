import PropTypes from 'prop-types';

import s from './ButtonsPart.module.css';

function ButtonsPart({ canSubmit, onCancelClick }) {
  return (
    <div>
      {canSubmit && (
        <button className={`${s.formButton} button`} type="submit">
          OK
        </button>
      )}
      {onCancelClick !== undefined && (
        <button
          type="button"
          className={`${s.formButton} button`}
          onClick={onCancelClick}
        >
          Annuler
        </button>
      )}
    </div>
  );
}

ButtonsPart.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  onCancelClick: PropTypes.func,
};

export default ButtonsPart;
