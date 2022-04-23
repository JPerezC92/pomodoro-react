import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskIsFinishedToggle } from "@/tasks/application/TaskIsFinishedToggle";
import { useCallback } from "react";
import { DexieTaskRepository } from "../DexieTask.repository";

export const useTaskIsFinishedToggle = () => {
  const { db, transaction, isLoading } = useUow();

  const taskIsFinishedToggleRun = useCallback(
    async (props: { taskId: string; isCompleted: boolean }) =>
      await transaction([db.task], async () => {
        const { taskId, isCompleted } = props;

        const taskIsFinishedToggle = TaskIsFinishedToggle({
          taskRepository: DexieTaskRepository({ db }),
        });

        await taskIsFinishedToggle.execute({ isCompleted, taskId });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskIsFinishedToggleRun,
  };
};
