import { useCallback } from "react";

import { DexieTaskRepository } from "../DexieTask.repository";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { TaskFindAll } from "@/tasks/application/TaskFindAll";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskStore } from "@/tasks/domain/TaskStore";
import { TaskListStore } from "@/tasks/domain/TaskListStore";

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
