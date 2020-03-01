import { useState } from 'react';

function useAlert() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  function handleAlert(text, error) {
    setMessage(text);
    setIsError(error);
  }

  return [message, isError, handleAlert];
}

export default useAlert;
