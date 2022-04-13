import { useCallback } from "react";

import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { JsUuidGenerator } from "@/shared/infrastructure/JsUuidGenerator";
import { TaskCreateDto } from "@/tasks/infrastructure/dto/task-create.dto";
import { TaskCreator } from "@/tasks/application/TaskCreator";
import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskTitle } from "@/tasks/domain/TaskTitle";

export const useTaskCreator = () => {
  const { db, transaction, isLoading } = useUow();

  const taskCreatorRun = useCallback(
    async (taskCreateDto: TaskCreateDto) => {
      const { title, projectId } = taskCreateDto;
      const taskCreator = TaskCreator({
        taskRepository: DexieTaskRepository({ db }),
      });

      await transaction([db.task], () =>
        taskCreator.execute({
          id: new TaskId(JsUuidGenerator().generate()),
          title: new TaskTitle(title),
          projectId: new TaskId(projectId),
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
