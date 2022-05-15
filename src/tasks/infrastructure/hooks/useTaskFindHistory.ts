import { useCallback, useState } from "react";

import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindHistory } from "@/tasks/application/TaskFindHistory";
import { DexieTaskRepository } from "@/tasks/infrastructure/DexieTask.repository";
import { TaskHistoryView } from "@/tasks/infrastructure/dto/taskHistoryView.dto";
import { TaskHistoryMapper } from "@/tasks/infrastructure/mappers/TaskHistoryMapper";

export const useTaskFindHistory = () => {
  const { db, transaction, isLoading } = useUow();

  const [taskHistoryList, setTaskHistoryList] = useState<TaskHistoryView[]>([]);

  const taskFindHistoryRun = useCallback(
    async () =>
      await transaction([db.task], async () => {
        const taskFindHistory = TaskFindHistory({
          taskRepository: DexieTaskRepository({ db }),
        });

        const result = await taskFindHistory.execute();

        setTaskHistoryList(result.map(TaskHistoryMapper.toView));
      }),
    [db, transaction]
  );

  return {
    taskFindHistoryRun,
    isLoading,
    taskHistoryList,
  };
};
