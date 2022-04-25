import { RefObject, useEffect, useRef, useState } from 'react';

export default function useClickOutside<RefType extends HTMLElement>(
  callback: EventListener
): RefObject<RefType> {
  const container = useRef<RefType>(null);
  const [isTouchEvent, setTouchEvent] = useState(false);
  const eventType = isTouchEvent ? 'touchend' : 'click';

  useEffect(() => {
    function handleEvent(e: Event): void {
      if (e.type === 'click' && isTouchEvent) { return; } // prettier-ignore

      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target as Node)) {
          callback(e);
        }
      }
    }

    document.addEventListener(eventType, handleEvent, true);

    return () => {
      document.removeEventListener(eventType, handleEvent, true);
    };
  }, [eventType, callback, isTouchEvent]);

  useEffect(() => {
    setTouchEvent('ontouchstart' in document.documentElement);
  }, []);

  return container;
}
