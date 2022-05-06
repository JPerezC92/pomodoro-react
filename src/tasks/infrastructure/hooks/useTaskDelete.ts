import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskDelete } from "@/tasks/application/TaskDelete";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { useCallback } from "react";

export const useTaskDelete = () => {
  const { db, transaction, isLoading } = useUow();

  const taskDeleteRun = useCallback(
    (props: { taskId: string }) =>
      transaction([db.task], async () => {
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
