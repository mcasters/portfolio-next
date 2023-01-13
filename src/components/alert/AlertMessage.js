import { useEffect } from 'react';
import PropTypes from 'prop-types';

const errorStyles = {
  padding: '20px',
  backgroundColor: '#ffa5ac',
};

const validStyles = {
  padding: '20px',
  backgroundColor: '#92ff8e',
};

export default function AlertMessage({ message, isError, close }) {
  let timeout = null;

  useEffect(() => {
    timeout = setTimeout(() => {
      close();
    }, 5000);
  });

  return (
    <div className={message} style={isError ? errorStyles : validStyles}>
      {message}
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};