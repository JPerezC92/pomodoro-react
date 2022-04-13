import { FC, useEffect } from "react";

import { StepType } from "@/pomodoro/domain/Step";
import { useChronometer } from "@/pomodoro/infrastructure/hooks/useChronometer";
import { useInitializePomodoro } from "@/pomodoro/infrastructure/hooks/useInitializePomodoro";
import { usePomodoroLocalStore } from "@/pomodoro/infrastructure/hooks/usePomodoroLocalStore";
import { usePomodoroNextStep } from "@/pomodoro/infrastructure/hooks/usePomodoroNextStep";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { taskId } = queryParams;
  const { pomodoro, pomodoroStore } = usePomodoroLocalStore();
  const { time, isRunning, ...actions } = useChronometer();
  const { initializePomodoroRun } = useInitializePomodoro({ pomodoroStore });

  const { pomodoroNextStepRun, isLoading: nextStepIsLoading } =
    usePomodoroNextStep({ pomodoroStore });

  const canInitializePomodoro = !isParsing && !!taskId;
  const canPassToNextStep =
    !!pomodoro &&
    pomodoro.step.seconds === time.totalSeconds &&
    !nextStepIsLoading;

  useEffect(() => {
    if (canInitializePomodoro) {
      initializePomodoroRun({ taskId: taskId });
    }
  }, [canInitializePomodoro, initializePomodoroRun, taskId]);

  useEffect(() => {
    if (canPassToNextStep) {
      pomodoroNextStepRun({ pomodoroDto: pomodoro }).then(actions.reset);
    }
  }, [canPassToNextStep, pomodoro, pomodoroNextStepRun, actions.reset]);

  return (
    <>
      <h1>PomodoroScreen</h1>

      <p>{`${pomodoro?.task.title}`}</p>

      <button type="button" onClick={actions.start} disabled={isRunning}>
        Start
      </button>
      <button type="button" onClick={actions.pause} disabled={!isRunning}>
        Pause
      </button>
      <button type="button" onClick={actions.stop} disabled={!isRunning}>
        Stop
      </button>
      <button type="button" onClick={actions.reset} disabled={isRunning}>
        Reset
      </button>
      <button type="button">Next task</button>

      {pomodoro?.step.type === StepType.FOCUS ? <p>Focus</p> : <p>Break</p>}

      <p>{pomodoro?.pomodoroCount}</p>

      <p>
        {time.minutes} : {time.seconds}
      </p>
    </>
  );
};
