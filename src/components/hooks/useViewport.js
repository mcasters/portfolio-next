import { useEffect, useState } from 'react';

import LAYOUT from '../../constants/layout';

function useViewport() {
  const [windowWidth, setWindowWidth] = useState(LAYOUT.DEFAULT_WINDOW_WIDTH);
  const [windowHeight, setWindowHeight] = useState(
    LAYOUT.DEFAULT_WINDOW_HEIGHT,
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [windowWidth, windowHeight]);

  return { windowWidth, windowHeight };
}

export default useViewport;
