import { useEffect, useRef } from 'react';

function useClickOutside(handler, isListenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) handler();
    }
    document.addEventListener('click', handleClick, isListenCapturing);
    return () =>
      document.removeEventListener('click', handleClick, isListenCapturing);
  }, [handler, isListenCapturing]);

  return ref;
}

export { useClickOutside };
