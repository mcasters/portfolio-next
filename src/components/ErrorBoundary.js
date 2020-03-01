import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAlert from './Hooks/useAlert';

function ErrorBoundary({ children }) {
  const [handleAlert] = useAlert();
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  React.componentDidCatch = (err, errInfo) => {
    setError(err);
    setErrorInfo(errInfo);
  };

  if (error) {
    const m = `${error.toString()} : ${errorInfo}`;
    return handleAlert(m, true);
  }
  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
