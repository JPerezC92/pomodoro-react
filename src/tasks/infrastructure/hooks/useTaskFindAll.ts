import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindAll } from "@/tasks/application/TaskFindAll";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

type Props = {};

export const useTaskFindAll = (taskListStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindAllRun = useCallback(
    async (props: { projectId?: string }) =>
      await transaction([db.task], async () => {
        const taskFindAll = TaskFindAll({
          taskRepository: DexieTaskRepository({ db }),
          taskListStore: taskListStore,
        });

        await taskFindAll.execute({ projectId: props.projectId });
      }),
    [db, taskListStore, transaction]
  );

  return {
    isLoading,
    taskFindAllRun,
  };
};
