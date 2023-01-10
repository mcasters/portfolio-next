import {useState, useEffect, useCallback} from 'react';
import throttle from 'lodash/throttle';

import { getScrollY } from '../../tools/windowUtils';

function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(
    throttle(() => {
      setScrollY(getScrollY());
    }, 500),
    [setScrollY],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return scrollY;
}

export default useScroll;