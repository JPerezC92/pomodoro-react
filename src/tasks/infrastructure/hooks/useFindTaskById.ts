import { useCallback, useState } from "react";

import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskFindById } from "@/tasks/application/TaskFindById";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useTaskFindById = () => {
  const [task, setTask] = useState<TaskViewDto | undefined>();
  const { db, isLoading, transaction } = useUow();

  const taskFindByIdRun = useCallback(
    async (props: { taskId: string }) => {
      const taskFindById = TaskFindById({
        taskRepository: DexieTaskRepository({ db }),
      });

      const task = await transaction([db.task], () =>
        taskFindById.execute({ taskId: props.taskId })
      );

      if (task) setTask(TaskMapper.toView(task));
    },
    [db, transaction]
  );

  return {
    task,
    isLoading,
    taskFindByIdRun,
  };
};
