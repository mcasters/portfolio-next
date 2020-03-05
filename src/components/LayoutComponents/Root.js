import React from 'react';
import PropTypes from 'prop-types';

import Alert from '../../Alert/Alert';
import Layout from '../Layout/Layout';
import useAlert from '../../Hooks/useAlert';

export default function Root({ children }) {
  const [message, isError, handleAlert] = useAlert();

  const clearAlert = () => {
    handleAlert('', false);
  };

  return (
    <>
      <Layout>{children}</Layout>
      {message !== '' && (
        <Alert message={message} isError={isError} clearAlert={clearAlert} />
      )}
    </>
  );
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
