import { useMemo, useState } from "react";

import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { Task } from "@/tasks/domain/Task";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskListState = () => {
  const [taskList, setTaskList] = useState<TaskViewDto[]>([]);

  const taskListStore: TaskListStore = useMemo(
    () => ({
      updateTaskList: (taskList: Task[]) =>
        setTaskList(taskList.map(TaskMapper.toView)),
    }),
    []
  );

  return {
    taskList,
    taskListStore,
  };
};
