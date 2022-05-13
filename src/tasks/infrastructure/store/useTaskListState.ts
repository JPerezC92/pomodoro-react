import { useMemo, useState } from "react";

import { Task } from "@/tasks/domain/Task";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskDomainToView } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskListState = () => {
  const [taskList, setTaskList] = useState<TaskViewDto[]>([]);

  const taskListStore: TaskListStore = useMemo(
    () => ({
      updateTaskList: (taskList: Task[]) =>
        setTaskList(taskList.map(TaskDomainToView)),
    }),
    []
  );

  return {
    taskList,
    taskListStore,
  };
};
