import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useAlert} from "./AlertContext/AlertContext";

function ErrorBoundary({ children }) {
  const triggerAlert = useAlert();
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  React.componentDidCatch = (err, errInfo) => {
    setError(err);
    setErrorInfo(errInfo);
  };

  if (error) {
    const m = `${error.toString()} : ${errorInfo}`;
    return triggerAlert(m, true);
  }
  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
