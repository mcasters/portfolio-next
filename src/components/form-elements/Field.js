import PropTypes from 'prop-types';
import s from './Field.module.css';

export default function Field(props) {
  return (
    <div>
      <label
        className={s.label}
        id={[props.name, 'label'].join('-')}
        htmlFor={[props.name, 'input'].join('-')}
      >
        {props.placeHolder}{' '}
        {props.required ? <span title="Required">*</span> : undefined}
      </label>
      <input
        placeholder={props.placeHolder}
        autoComplete={props.autoComplete}
        id={[props.name, 'input'].join('-')}
        name={props.name}
        required={props.required}
        type={props.type}
      />
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  autoComplete: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
