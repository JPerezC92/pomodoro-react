import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindIndividuals } from "@/tasks/application/TaskFindIndividuals";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskFindIndividuals = (taskStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindIndividualsRun = useCallback(
    async () =>
      await transaction([db.task], async () => {
        const taskCreator = TaskFindIndividuals({
          taskRepository: DexieTaskRepository({ db }),
          taskStore,
        });

        await taskCreator.execute();
      }),
    [db, taskStore, transaction]
  );

  return {
    isLoading,
    taskFindIndividualsRun,
  };
};
