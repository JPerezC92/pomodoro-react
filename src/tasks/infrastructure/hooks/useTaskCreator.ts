import { useCallback } from "react";

import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { JsUuidGenerator } from "@/shared/infrastructure/JsUuidGenerator";
import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { TaskCreator } from "@/tasks/application/TaskCreator";
import { useUow } from "@/shared/infrastructure/db/Uow";

export const useTaskCreator = () => {
  const { db, transaction, isLoading } = useUow();

  const taskCreatorRun = useCallback(
    async (taskCreateDto: TaskCreateDto & { projectId: string }) => {
      const taskCreator = TaskCreator({
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], () =>
        taskCreator.execute({
          id: JsUuidGenerator().generate(),
          ...taskCreateDto,
        })
      );
    },
    [db, transaction]
  );

  return {
    isLoading,
    taskCreatorRun,
  };
};
