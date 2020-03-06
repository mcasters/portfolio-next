import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '../Alert/Alert';
import Layout from './Layout/Layout';
// import useAlert from '../Hooks/useAlert';
import AlertContext from '../AlertContext/AlertContext';

export default function Root({ children }) {
  // const [message, isError, handleAlert] = useAlert();
  // const alert = useContext(AlertContext);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const clearAlert = () => {
    // setMessage('');
  };

  const triggerAlert = (message, isError) => {
    setMessage(message);
    setIsError(isError);
  };

  return (
    <>

        <Layout>{children}</Layout>


    </>
  );
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
