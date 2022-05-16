import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindAllWithoutProject } from "@/tasks/application/TaskFindAllWithoutProject";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskFindAllWithoutProject = (taskListStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindAllWithoutProjectRun = useCallback(
    async () =>
      await transaction([db.task], async () => {
        const taskFindAllWithoutProject = TaskFindAllWithoutProject({
          taskRepository: DexieTaskRepository({ db }),
          taskListStore: taskListStore,
        });

        await taskFindAllWithoutProject.execute();
      }),
    [db, taskListStore, transaction]
  );

  return {
    isLoading,
    taskFindAllWithoutProjectRun,
  };
};
