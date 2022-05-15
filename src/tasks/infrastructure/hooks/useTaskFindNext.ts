import { useCallback, useState } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindNext } from "@/tasks/application/TaskFindNext";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskDomainToView } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskFindNext = () => {
  const { db, transaction, isLoading } = useUow();
  const [nextTask, setNextTask] = useState<TaskViewDto | undefined>(undefined);

  const taskFindNextRun = useCallback(
    async (currentTaskId: string) =>
      await transaction([db.task], async () => {
        const taskFindNext = TaskFindNext({
          taskRepository: DexieTaskRepository({ db }),
        });

        const task = await taskFindNext.execute({ currentTaskId });

        if (!task) return;

        setNextTask(TaskDomainToView(task));
      }),
    [db, transaction]
  );

  return {
    isLoading,
    nextTask,
    taskFindNextRun,
  };
};
