import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindHistory } from "@/tasks/application/TaskFindHistory";
import { TaskHistoryStore } from "@/tasks/domain/TaskHistoryStore";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskFindHistory = (taskHistoryStore: TaskHistoryStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindHistoryRun = useCallback(
    async () =>
      await transaction([db.task], async () => {
        const taskFindHistory = TaskFindHistory({
          taskRepository: DexieTaskRepository({ db }),
          taskHistoryStore,
        });

        await taskFindHistory.execute();
      }),
    [db, taskHistoryStore, transaction]
  );

  return {
    taskFindHistoryRun,
    isLoading,
  };
};
