import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';
import { usePopper } from 'react-popper';

import UpdateForm from './UpdateForm';
import s from './updateButton.module.css';

function UpdateButton({ item, type }) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'auto',
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  return (
    <>
      <div key={item.id} ref={popperRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleButtonClick}
          className={`${s.command} button`}
        >
          <FaPen />
        </button>
      </div>
      {isPopperOpen && (
        <div
          tabIndex={-1}
          style={popper.styles.popper}
          className={s.popperContainer}
          {...popper.attributes.popper}
          ref={setPopperElement}
          role="dialog"
        >
          <UpdateForm item={item} type={type} close={closePopper} />
        </div>
      )}
    </>
  );
}

UpdateButton.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default UpdateButton;