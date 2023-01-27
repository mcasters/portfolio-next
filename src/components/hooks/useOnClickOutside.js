import {useEffect, useRef, useState} from 'react';

function useOnClickOutside(element, handler) {
  const [ isClickOutside, setIsClickOutside] = useState(false);

  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e) => {
      console.log(element);
      if (element.current && !element.current.contains(e.target)) {
        console.log(e.target);
        console.log('//// VFGEFE');
        e.preventDefault();
        setIsClickOutside(true);
        handler();
      }
      return undefined;
    };

    if (typeof document === 'undefined') return;
    document.addEventListener('click', listener);

    return function cleanup() {
      document.removeEventListener('click', listener);
    };
  }, [isClickOutside]);
}

export default useOnClickOutside;