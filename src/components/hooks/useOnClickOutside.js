import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
      return undefined;
    };

    if (typeof document === 'undefined') return;
    document.addEventListener('mousedown', listener);

    return function cleanup() {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref]);
}

export default useOnClickOutside;
