import React from 'react';
import PropTypes from 'prop-types';

import s from './MenuButton.module.css';

function MenuButton({ open, onClick }) {
  const handleClick = e => {
    onClick(e);
  };

  const styles = {
    line: {
      height: '2px',
      width: '20px',
      background: '#ab8b8b',
      transition: 'all 0.2s ease',
    },
    lineTop: {
      transform: open ? 'rotate(45deg)' : 'none',
      transformOrigin: 'top left',
      marginBottom: '5px',
    },
    lineMiddle: {
      opacity: open ? 0 : 1,
      transform: open ? 'translateX(-16px)' : 'none',
    },
    lineBottom: {
      transform: open ? 'translateX(-1px) rotate(-45deg)' : 'none',
      transformOrigin: 'top left',
      marginTop: '5px',
    },
  };

  return (
    <button
      className={s.container}
      onClick={handleClick}
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

MenuButton.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuButton;
