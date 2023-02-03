import { useEffect } from 'react';

function useEventListener(e, handler, cleanup, passive = false) {
  useEffect(() => {
    window.addEventListener(e, handler, passive);

    return function remove() {
      cleanup && cleanup(); // optional specific cleanup for the handler

      window.removeEventListener(e, handler);
    };
  }, [cleanup, e, handler, passive]);
}

export default useEventListener;
