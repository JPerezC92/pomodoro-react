import { FC, useEffect } from "react";

import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useFindTaskById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { useChronometer } from "../../hooks/useChronometer";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { task, findTaskByIdRun } = useFindTaskById();
  const { time, start, stop, restart } = useChronometer();

  useEffect(() => {
    if (!isParsing && queryParams.taskId) {
      findTaskByIdRun({ taskId: queryParams.taskId });
    }
  }, [findTaskByIdRun, isParsing, queryParams.taskId]);

  return (
    <>
      <h1>PomodoroScreen</h1>

      <button type="button" onClick={start}>
        Start
      </button>
      <button type="button" onClick={stop}>
        Stop
      </button>
      <button type="button" onClick={restart}>
        Reset
      </button>
      <button type="button">Next task</button>

      {task?.id}

      <p>{new Date().getTime()}</p>
      <p>{new Date().getTime() + 1000}</p>

      <p>
        {Math.trunc(time / 60)} : {time % 60}
      </p>
    </>
  );
};
