import { useEffect } from 'react';

function useEventListener(e, handler, cleanup, passive = false) {
  useEffect(() => {
    window.addEventListener(e, handler, passive);

    return function remove() {
      cleanup && cleanup(); // optional specific cleanup for the handler

      window.removeEventListener(e, handler);
    };
  }, [e, handler, passive]);
}

export default useEventListener;

// To set into the caller component :
//
// const handleWheel = useCallback(_.throttle(() => {
//   setCount(count => count + 1);
// }, 10000, { leading: false }), [setCount]);
//
// useEventListener("wheel", handleWheel, handleWheel.cancel);
