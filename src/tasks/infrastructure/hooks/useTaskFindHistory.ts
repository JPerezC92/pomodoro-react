import { useUow } from "@/shared/infrastructure/db/Uow";
import { TaskFindHistory } from "@/tasks/application/TaskFindHistory";
import { useCallback, useState } from "react";
import { DexieTaskRepository } from "../DexieTask.repository";
import { TaskHistoryView } from "../dto/taskHistoryView.dto";
import { TaskHistoryMapper } from "../mappers/TaskHistoryMapper";

export const useTaskFindHistory = () => {
  const { db, transaction, isLoading } = useUow();

  const [taskHistoryList, setTaskHistoryList] = useState<TaskHistoryView[]>([]);

  const taskFindHistoryRun = useCallback(
    () =>
      transaction([db.task], async () => {
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
