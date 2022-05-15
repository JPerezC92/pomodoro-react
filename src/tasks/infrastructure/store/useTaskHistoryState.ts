import React from "react";

import { Task } from "@/tasks/domain/Task";
import { TaskHistoryStore } from "@/tasks/domain/TaskHistoryStore";
import { TaskHistoryView } from "@/tasks/infrastructure/dto/taskHistoryView.dto";
import { TaskDomainToHistoryView } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskHistoryState = () => {
  const [taskHistoryList, setTaskHistoryList] = React.useState<
    TaskHistoryView[]
  >([]);

  const taskHistoryStore: TaskHistoryStore = React.useMemo(
    () => ({
      updateTaskHistoryList: (taskList: Task[]) => {
        setTaskHistoryList(TaskDomainToHistoryView(taskList));
      },
    }),
    []
  );

  return React.useMemo(
    () => ({
      taskHistoryStore,
      taskHistoryList,
    }),
    [taskHistoryList, taskHistoryStore]
  );
};
