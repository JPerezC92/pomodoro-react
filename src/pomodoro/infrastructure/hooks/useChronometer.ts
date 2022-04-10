import { useCallback, useEffect, useState } from "react";

const initialTimeValue = 0;

export const useChronometer = () => {
  const [time, setTime] = useState(initialTimeValue);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback(() => {
    setTime(initialTimeValue);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return { time, start, isRunning, stop, restart };
};
