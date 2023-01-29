import {useState, useEffect, useCallback} from 'react';
import throttle from 'lodash/throttle';

import { getScrollY } from '../../tools/windowUtils';

function useElementIsUpTo(ref, yLimit) {
  const [scrollY, setScrollY] = useState(0);
  const [isUpTo, setIsUpTo] = useState(false);

  const handleScroll = useCallback(
    throttle(() => {
      setScrollY(getScrollY());
      setIsUpTo(ref.current?.getBoundingClientRect().bottom < yLimit);
    }, 500),
    [],
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

  return isUpTo;
}

export default useElementIsUpTo;
