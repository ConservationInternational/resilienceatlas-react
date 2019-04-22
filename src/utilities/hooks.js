import { useEffect, useState, useCallback } from 'react';

export const useToggle = (initial = false) => {
  const [toggled, setToggle] = useState(initial);

  const toggle = useCallback(() => {
    setToggle(!toggled);
  }, [toggled]);

  useEffect(() => setToggle(initial), [initial]);

  return [toggled, toggle];
};

export const useInput = (name, initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);

  return { name, value, onChange };
};

export const useUpdaterInput = (name, initialValue, updater) => {
  // setting up a input
  const [value, setValue] = useState(initialValue);
  const onChange = e => setValue(e.target.value);

  // call update handler only if value changed
  const update = useCallback(() => {
    if (value !== initialValue) updater(value);
  }, [value, initialValue]);

  // adding a update handlers
  const onKeyPress = useCallback(
    e => (e.keyCode === 13 || e.charCode === 13) && update(),
    [value],
  );
  const onBlur = useCallback(() => update(), [value]);

  // update current value if initial has been changed
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { name, value, onChange, onKeyPress, onBlur };
};
