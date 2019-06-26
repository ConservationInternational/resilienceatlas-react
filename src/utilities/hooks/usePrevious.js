import { useRef, useEffect } from 'react';

export const usePrevious = value => {
  const prev = useRef();

  useEffect(() => {
    prev.current = value;
  });

  return prev.current;
};
