import React, { useEffect } from 'react';

export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: CallableFunction
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return function cleanUp() {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
