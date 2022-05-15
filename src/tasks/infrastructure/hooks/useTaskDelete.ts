import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskDelete } from "@/tasks/application/TaskDelete";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskDelete = () => {
  const { db, transaction, isLoading } = useUow();

  const taskDeleteRun = useCallback(
    async (props: { taskId: string }) =>
      await transaction([db.task], async () => {
        const { taskId } = props;
        const taskDelete = TaskDelete({
          taskRepository: DexieTaskRepository({ db }),
        });

        await taskDelete.execute({ taskId });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskDeleteRun,
  };
};
