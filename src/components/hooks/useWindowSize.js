import { useEffect, useState } from 'react';

import LAYOUT from '../../constants/layout';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    innerWidth: LAYOUT.DEFAULT_WINDOW_WIDTH,
    innerHeight: LAYOUT.DEFAULT_WINDOW_HEIGHT,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return windowSize;
};
export default useWindowSize;
