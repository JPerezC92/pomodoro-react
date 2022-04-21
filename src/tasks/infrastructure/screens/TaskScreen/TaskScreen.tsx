import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { FC, useEffect } from "react";
import { useTaskFindById } from "../../hooks/useFindTaskById";

type TaskScreenProps = {};

export const TaskScreen: FC<TaskScreenProps> = (props) => {
  const { queryParams, isParsing } = usePullQueryString({ taskId: "taskId" });

  const { task, taskFindByIdRun, isLoading } = useTaskFindById();

  useEffect(() => {
    if (!isParsing && queryParams.taskId) {
      taskFindByIdRun({ taskId: queryParams.taskId });
    }
  }, [taskFindByIdRun, isParsing, queryParams.taskId]);

  return (
    <div>
      <h1>TaskScreen</h1>

      {queryParams.taskId}

      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
};
