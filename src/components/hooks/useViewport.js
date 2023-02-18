import { useEffect, useState } from 'react';

import LAYOUT from '../../constants/layout';

function useViewport() {
  const [windowRect, setWindowRect] = useState({
    innerWidth: LAYOUT.DEFAULT_WINDOW_WIDTH,
    innerHeight: LAYOUT.DEFAULT_WINDOW_HEIGHT,
  });

  useEffect(() => {
    setWindowRect({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowRect({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [windowRect]);

  return windowRect;
}

export default useViewport;
