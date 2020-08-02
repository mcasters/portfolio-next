import PropTypes from 'prop-types';

import s from './Button.module.css';

function Button({ isOpen, onClick }) {

  const styles = {
    line: {
      height: '2px',
      width: '20px',
      background: '#ab8b8b',
      transition: 'all 0.2s ease',
    },
    lineTop: {
      transform: isOpen ? 'rotate(45deg)' : 'none',
      transformOrigin: 'top left',
      marginBottom: '5px',
    },
    lineMiddle: {
      opacity: isOpen ? 0 : 1,
      transform: isOpen ? 'translateX(-16px)' : 'none',
    },
    lineBottom: {
      transform: isOpen ? 'translateX(-1px) rotate(-45deg)' : 'none',
      transformOrigin: 'top left',
      marginTop: '5px',
    },
  };

  return (
    <button
      className={s.container}
      onClick={onClick}
      aria-label="Menu"
      tabIndex={0}
      type="button"
    >
      <div style={{ ...styles.line, ...styles.lineTop }} />
      <div style={{ ...styles.line, ...styles.lineMiddle }} />
      <div style={{ ...styles.line, ...styles.lineBottom }} />
    </button>
  );
}

Button.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
