import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

import { getScrollY } from '../../../tools/windowUtils';

function useScroll() {
  const [scrollY, setScrollY] = useState(getScrollY());

  useEffect(() => {
    function handleChangeScroll() {
      setScrollY(getScrollY());
    }

    window.addEventListener('scroll', throttle(handleChangeScroll, 200), {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleChangeScroll);
    };
  }, []);

  return scrollY;
}

export default useScroll;
