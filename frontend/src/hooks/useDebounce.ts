import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DEFAULT_DEBOUNCE_TIME_IN_MS } from "../consts";

const useDebounce = <T>(
  value: T,
  delay: number = DEFAULT_DEBOUNCE_TIME_IN_MS
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
