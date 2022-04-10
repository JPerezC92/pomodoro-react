import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { useFindTaskById } from "@/tasks/infrastructure/hooks/useFindTaskById";
import { FC, useEffect } from "react";

type PomodoroScreenProps = {};

export const PomodoroScreen: FC<PomodoroScreenProps> = (props) => {
  const { isParsing, queryParams } = usePullQueryString({ taskId: "taskId" });
  const { task, findTaskByIdRun, isLoading } = useFindTaskById();

  useEffect(() => {
    if (!isParsing && queryParams.taskId) {
      findTaskByIdRun({ taskId: queryParams.taskId });
    }
  }, [findTaskByIdRun, isParsing, queryParams.taskId]);

  return (
    <>
      <h1>PomodoroScreen</h1>

      {task?.id}
    </>
  );
};
