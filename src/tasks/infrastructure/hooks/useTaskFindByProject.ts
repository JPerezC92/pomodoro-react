import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskFindByProject } from "@/tasks/application/TaskFindByProject";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

type Props = {};

export const useTaskFindByProject = (taskStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindByProjectRun = useCallback(
    async ({ projectId }: { projectId: string }) => {
      const taskFindAll = TaskFindByProject({
        taskRepository: DexieTaskRepository({ db }),
        taskStore,
      });

      return await transaction([db.task], () =>
        taskFindAll.execute({ projectId })
      );
    },
    [db, taskStore, transaction]
  );

  return {
    isLoading,
    taskFindByProjectRun,
  };
};
