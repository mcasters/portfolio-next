import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen } from 'react-icons/fa';
import { usePopper } from 'react-popper';

import UpdateForm from './UpdateForm';
import s from './updateButton.module.css';

function UpdateButton({ item }) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'left-start',
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  return (
    <>
      <div key={item.id} ref={popperRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsPopperOpen(true);
          }}
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
          <UpdateForm item={item} close={closePopper} />
        </div>
      )}
    </>
  );
}

UpdateButton.propTypes = {
  item: PropTypes.object.isRequired,
};

export default UpdateButton;
