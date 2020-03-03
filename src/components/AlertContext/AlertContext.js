import React from 'react';

const AlertContext = React.createContext({
  message: '',
  isError: false,
  triggerAlert: () => {},
});

export default AlertContext;
