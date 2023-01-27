import { useEffect } from 'react';

function useCloseMobileNav(ref, handler, isOpen) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.preventDefault();
        handler();
      }
      return undefined;
    };

    if (!isOpen || typeof document === 'undefined') return;
    document.addEventListener('click', listener, false);

    return function cleanup() {
      document.removeEventListener('click', listener, false);
    };
  }, [isOpen]);
}

export default useCloseMobileNav;