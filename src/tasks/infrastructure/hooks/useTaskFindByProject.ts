import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskFindByProject } from "@/tasks/application/TaskFindByProject";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskFindByProject = (taskStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindByProjectRun = useCallback(
    async ({ projectId }: { projectId: string }) =>
      await transaction([db.task], async () => {
        const taskFindAll = TaskFindByProject({
          taskRepository: DexieTaskRepository({ db }),
          taskStore,
        });

        await taskFindAll.execute({ projectId });
      }),
    [db, taskStore, transaction]
  );

  return {
    isLoading,
    taskFindByProjectRun,
  };
};
