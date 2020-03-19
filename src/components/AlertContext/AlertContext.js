import React, { useContext, useState } from 'react';
import Alert from '../Alert/Alert';

const AlertContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const clearAlert = () => {
    setMessage('');
  };

  const triggerAlert = (message, isError) => {
    setMessage(message);
    setIsError(isError);
  };
  return (
    <AlertContext.Provider value={triggerAlert}>
      {children}
      {message !== '' && (
        <Alert message={message} isError={isError} clearAlert={clearAlert} />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
