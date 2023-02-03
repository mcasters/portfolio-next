import { useContext, useRef, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';

import AlertMessage from './AlertMessage';
import s from './alert.module.css';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Alert = createContext({});

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

  useOnClickOutside(popperElement, closePopper);

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
          <div
            tabIndex={-1}
            className={s.popperContainer}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <AlertMessage
              message={message}
              isError={isError}
              close={closePopper}
            />
          </div>
        )}
      </div>
    </Alert.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAlert = () => useContext(Alert);
