import React, { useContext, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';

import AlertMessage from './AlertMessage';
import s from './alert.module.css';

const Alert = React.createContext({});

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const popperRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const popper = usePopper(popperRef.current, popperElement);

  const closePopper = () => {
    setMessage('');
    setIsPopperOpen(false);
  };

  const triggerAlert = (message, isError) => {
    setMessage(message);
    setIsError(isError);
    setIsPopperOpen(true);
  };

  return (
    <Alert.Provider value={triggerAlert}>
      <div ref={popperRef}>
        {children}
        {isPopperOpen && (
          <FocusTrap
            active
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
              onDeactivate: closePopper,
              fallbackFocus: popperRef.current,
            }}
          >
            <div
              tabIndex={-1}
              className={s.popperContainer}
              {...popper.attributes.popper}
              ref={setPopperElement}
              role="dialog"
            >
              <AlertMessage message={message} isError={isError} close={closePopper} />
            </div>
          </FocusTrap>
        )}
      </div>
    </Alert.Provider>
  );
};

export const useAlert = () => useContext(Alert);