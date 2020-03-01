import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

import { getScrollY } from '../../../tools/windowUtils';

function useScroll() {
  const [scrollY, setScrollY] = useState(getScrollY());

  function handleChangeScroll() {
    setScrollY(getScrollY());
  }

  useEffect(() => {
    window.addEventListener('scroll', throttle(handleChangeScroll, 200), {
      passive: true,
    });
    return function cleanup() {
      window.removeEventListener('scroll', handleChangeScroll);
    };
  }, []);

  return scrollY;
}

export default useScroll;
