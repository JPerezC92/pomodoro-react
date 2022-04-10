import { useCallback } from "react";

import { DexieTaskRepository } from "../DexieTask.repository";
import { ProjectStore } from "@/projects/domain/ProjectStore";
import { TaskFindAll } from "@/tasks/application/TaskFindAll";
import { useUow } from "@/shared/infrastructure/db/Uow";

type Props = {};

export const useTaskFindAll = () => {
  const { db, transaction, isLoading } = useUow();

  const taskFindAllRun = useCallback(async () => {
    const taskFindAll = TaskFindAll({
      taskRepository: DexieTaskRepository({ db }),
    });

    return await transaction([db.task], () => taskFindAll.execute());
  }, [db, transaction]);

  return {
    isLoading,
    taskFindAllRun,
  };
};
