import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindByProject } from "@/tasks/application/TaskFindByProject";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import React from "react";
import { DexieTaskRepository } from "../DexieTask.repository";

export const useTaskFindByProject = (taskListStore: TaskListStore) => {
  const { db, transaction, isLoading } = useUow();

  const taskFindByProjectRun = React.useCallback(
    async (props: { projectId: string }) =>
      await transaction([db.task], async () => {
        const { projectId } = props;

        const taskFindByProject = TaskFindByProject({
          taskListStore: taskListStore,
          taskRepository: DexieTaskRepository({ db }),
        });

        await taskFindByProject.execute({ projectId });
      }),
    [db, taskListStore, transaction]
  );

  return {
    isLoading,
    taskFindByProjectRun,
  };
};
