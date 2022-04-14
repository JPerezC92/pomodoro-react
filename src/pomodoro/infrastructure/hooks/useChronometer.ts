import { useCallback, useEffect, useState } from "react";

const initialTimeValue = 0;

export const useChronometer = () => {
  const [time, setTime] = useState(initialTimeValue);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(
    (callables?: { afterStart?: () => void; beforeStart?: () => void }) => {
      callables && callables.beforeStart?.();
      setIsRunning(true);
      callables && callables.afterStart?.();
    },
    []
  );

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(initialTimeValue);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return {
    time: {
      totalSeconds: time,
      minutes: Math.trunc(time / 60),
      seconds: time % 60,
    },
    start,
    isRunning,
    stop,
    reset,
    pause,
  };
};
