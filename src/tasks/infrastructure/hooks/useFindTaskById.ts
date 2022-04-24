import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindById } from "@/tasks/application/TaskFindById";
import { TaskStore } from "@/tasks/domain/TaskStore";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskFindById = (taskStore?: TaskStore) => {
  const { db, isLoading, transaction } = useUow();

  const taskFindByIdRun = useCallback(
    async (props: { taskId: string }) =>
      await transaction([db.task], async () => {
        const taskFindById = TaskFindById({
          taskRepository: DexieTaskRepository({ db }),
          taskStore,
        });

        await taskFindById.execute({ taskId: props.taskId });
      }),
    [db, taskStore, transaction]
  );

  return {
    isLoading,
    taskFindByIdRun,
  };
};
