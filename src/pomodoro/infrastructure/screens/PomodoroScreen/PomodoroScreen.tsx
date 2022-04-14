import { FC, useCallback, useEffect } from "react";

import { StepType } from "@/pomodoro/domain/Step";
import { useChronometer } from "@/pomodoro/infrastructure/hooks/useChronometer";
import { useInitializePomodoro } from "@/pomodoro/infrastructure/hooks/useInitializePomodoro";
import { usePomodoroLocalStore } from "@/pomodoro/infrastructure/hooks/usePomodoroLocalStore";
import { usePomodoroNextStep } from "@/pomodoro/infrastructure/hooks/usePomodoroNextStep";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useRegisterFirstPomodoroStart } from "@/tasks/infrastructure/hooks/useRegisterFirstPomodoroStart";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { taskId } = queryParams;
  const { pomodoro, pomodoroStore } = usePomodoroLocalStore();
  const { time, isRunning, ...actions } = useChronometer();
  const { initializePomodoroRun } = useInitializePomodoro({ pomodoroStore });
  const { registerFirstPomodoroStartRun } = useRegisterFirstPomodoroStart();
  const { pomodoroNextStepRun, isLoading: nextStepIsLoading } =
    usePomodoroNextStep({ pomodoroStore });

  const canInitializePomodoro = !isParsing && !!taskId;
  const canPassToNextStep =
    !!taskId &&
    !!pomodoro &&
    pomodoro.step.seconds === time.totalSeconds &&
    !nextStepIsLoading;

  const canRegisterFirstPomodoro =
    !!taskId && !pomodoro?.task.isFirstPomodoroStarted;

  useEffect(() => {
    if (canInitializePomodoro) {
      initializePomodoroRun({ taskId: taskId });
    }
  }, [canInitializePomodoro, initializePomodoroRun, taskId]);

  useEffect(() => {
    if (canPassToNextStep) {
      pomodoroNextStepRun({ pomodoroDto: pomodoro, taskId }).then(
        actions.reset
      );
    }
  }, [actions.reset, canPassToNextStep, pomodoro, pomodoroNextStepRun, taskId]);

  const afterStart = useCallback(() => {
    if (canRegisterFirstPomodoro) {
      registerFirstPomodoroStartRun({ taskid: taskId });
    }
  }, [canRegisterFirstPomodoro, registerFirstPomodoroStartRun, taskId]);

  return (
    <>
      <h1>PomodoroScreen</h1>

      <p>{`${pomodoro?.task.title}`}</p>
      <p>isFirstPomodoroStarted:{`${pomodoro?.task.isFirstPomodoroStarted}`}</p>

      <button
        type="button"
        onClick={() => actions.start({ afterStart })}
        disabled={isRunning}
      >
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

      {pomodoro?.isFocus ? <p>Focus</p> : <p>Break</p>}

      <p>{pomodoro?.pomodoroCount}</p>

      <p>
        {time.minutes} : {time.seconds}
      </p>
    </>
  );
};
