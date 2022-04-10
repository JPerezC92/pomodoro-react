import { useCallback, useState } from "react";

import { DexieTaskRepository } from "../DexieTask.repository";
import { TaskDto } from "../dto/task.dto";
import { TaskFindById } from "@/tasks/application/TaskFindById";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useFindTaskById = () => {
  const [task, setTask] = useState<TaskDto | undefined>();
  const { db, isLoading, transaction } = useUow();

  const findTaskByIdRun = useCallback(
    async (props: { taskId: string }) => {
      const taskFindById = TaskFindById({
        taskRepository: DexieTaskRepository({ db }),
      });

      const task = await transaction([db.task], () =>
        taskFindById.execute({ taskId: props.taskId })
      );

      if (task) setTask(task);
    },
    [db, transaction]
  );

  return {
    task,
    isLoading,
    findTaskByIdRun,
  };
};
