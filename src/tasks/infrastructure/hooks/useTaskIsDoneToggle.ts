import { useCallback } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskIsDoneToggle } from "@/tasks/application/TaskIsDoneToggle";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";

export const useTaskIsDoneToggle = () => {
  const { db, transaction, isLoading } = useUow();

  const taskIsDoneToggleRun = useCallback(
    async (props: { taskId: string; isCompleted: boolean }) =>
      await transaction([db.task], async () => {
        const { taskId, isCompleted } = props;

        const taskIsDoneToggle = TaskIsDoneToggle({
          taskRepository: DexieTaskRepository({ db }),
        });

        await taskIsDoneToggle.execute({ isCompleted, taskId });
      }),
    [db, transaction]
  );

  return {
    isLoading,
    taskIsDoneToggleRun,
  };
};
