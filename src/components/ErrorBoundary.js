import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAlert } from './alert-context/AlertContext';

function ErrorBoundary({ children }) {
  const triggerAlert = useAlert();
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  React.getDerivedStateFromError = error => {
    return { error: error };
  };

  React.componentDidCatch = (err, info) => {
    setError(err);
    setInfo(info);
  };

  if (error) {
    const message = `${error.toString()} : ${info}`;
    return triggerAlert(message, true);
  }
  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
