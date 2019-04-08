import { useState, useCallback } from 'react';

export const useToggle = (initial = false) => {
  const [toggled, setToggle] = useState(initial);

  const toggle = useCallback(() => {
    setToggle(!toggled);
  }, [toggled]);

  return [toggled, toggle];
};
