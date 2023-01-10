import { useEffect } from 'react';

function useOnClickOutside(ref, handler, isActive) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.preventDefault();
        handler();
      }
      return undefined;
    };

    if (!isActive || typeof document === 'undefined') return;
    document.addEventListener('click', listener, false);

    return function cleanup() {
      document.removeEventListener('click', listener, false);
    };
  }, [ref, handler, isActive]);
}

export default useOnClickOutside;
