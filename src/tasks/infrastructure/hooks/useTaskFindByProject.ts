import { useCallback } from "react";

import { DexieTaskRepository } from "../DexieTask.repository";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { TaskFindAll } from "@/tasks/application/TaskFindAll";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindByProject } from "../../application/TaskFindByProject";
import { TaskStore } from "@/tasks/application/TaskStore";

type Props = {};

export const useTaskFindByProject = (taskStore: TaskStore) => {
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
