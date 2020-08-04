import { useEffect, useState } from 'react';

import { getWindowWidth, getWindowHeight } from '../../../tools/windowUtils';

function useViewport() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(() => getWindowWidth());
      setWindowHeight(() => getWindowHeight());
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { windowWidth, windowHeight };
}

export default useViewport;
