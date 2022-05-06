import { useCallback } from "react";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskRename } from "@/tasks/application/TaskRename";
import { DexieTaskRepository } from "../DexieTask.repository";

export const useTaskRename = () => {
  const { db, transaction, isLoading } = useUow();

  const taskRenameRun = useCallback(
    async (props: { taskId: string; newName: string }) =>
      await transaction([db.task], async () => {
        const { taskId, newName } = props;

        const taskRename = TaskRename({
          taskRepository: DexieTaskRepository({ db }),
        });

        await taskRename.execute({ taskId, newName });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskRenameRun,
  };
};
