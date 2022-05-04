import { useCallback, useEffect, useMemo, useReducer } from "react";

enum ChronometerStatus {
  Initial,
  Paused,
  Running,
  Stopped,
}

export interface UseChronometerResult {
  time: {
    totalSeconds: number;
    minutes: number;
    seconds: number;
    stoppedAt: number;
  };
  status: {
    isStopped: boolean;
    isRunning: boolean;
    isPaused: boolean;
  };
  timerActions: {
    start: () => void;
    pause: () => void;
    stop: () => void;
    restart: () => void;
  };
}

interface ChronometerState {
  seconds: number;
  stoppedAt: number;
  currentStatus: ChronometerStatus;
}

enum ChronometerActionType {
  Start,
  Pause,
  Stop,
  Restart,
  AddSecond,
}

type ChronometerAction =
  | { type: ChronometerActionType.Start }
  | { type: ChronometerActionType.Pause }
  | { type: ChronometerActionType.Stop }
  | { type: ChronometerActionType.Restart }
  | { type: ChronometerActionType.AddSecond };

const initialState: ChronometerState = {
  seconds: 0,
  stoppedAt: 0,
  currentStatus: ChronometerStatus.Initial,
};

const reducer = (
  state: ChronometerState,
  action: ChronometerAction
): ChronometerState => {
  switch (action.type) {
    case ChronometerActionType.Start:
      return { ...state, currentStatus: ChronometerStatus.Running };
    case ChronometerActionType.Pause:
      return { ...state, currentStatus: ChronometerStatus.Paused };
    case ChronometerActionType.Stop:
      return {
        ...state,
        currentStatus: ChronometerStatus.Stopped,
        seconds: 0,
        stoppedAt: state.seconds,
      };
    case ChronometerActionType.Restart:
      return { ...state, seconds: 0 };

    case ChronometerActionType.AddSecond:
      return { ...state, seconds: state.seconds + 1 };

    default:
      return state;
  }
};

export const useChronometer = (): UseChronometerResult => {
  const [chronometerState, chronometerDispatch] = useReducer(
    reducer,
    initialState
  );

  const start = useCallback(() => {
    chronometerDispatch({ type: ChronometerActionType.Start });
  }, []);

  const stop = useCallback(() => {
    chronometerDispatch({ type: ChronometerActionType.Stop });
  }, []);

  const restart = useCallback(() => {
    chronometerDispatch({ type: ChronometerActionType.Restart });
  }, []);

  const pause = useCallback(() => {
    chronometerDispatch({ type: ChronometerActionType.Pause });
  }, []);

  const status = useMemo(
    () => ({
      isStopped: chronometerState.currentStatus === ChronometerStatus.Stopped,
      isRunning: chronometerState.currentStatus === ChronometerStatus.Running,
      isPaused: chronometerState.currentStatus === ChronometerStatus.Paused,
    }),
    [chronometerState.currentStatus]
  );

  useEffect(() => {
    if (status.isRunning) {
      const interval = setInterval(() => {
        chronometerDispatch({ type: ChronometerActionType.AddSecond });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status.isRunning]);

  return {
    time: {
      totalSeconds: chronometerState.seconds,
      minutes: Math.trunc(chronometerState.seconds / 60),
      seconds: chronometerState.seconds % 60,
      stoppedAt: chronometerState.stoppedAt,
    },
    status,
    timerActions: useMemo(
      () => ({
        start,
        pause,
        stop,
        restart,
      }),
      [pause, restart, start, stop]
    ),
  };
};
