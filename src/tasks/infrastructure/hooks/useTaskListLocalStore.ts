import { useMemo, useState } from "react";

import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { Task } from "@/tasks/domain/Task";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskListLocalStore = () => {
  const [taskList, setTasks] = useState<TaskViewDto[]>([]);

  const taskStore: TaskListStore = useMemo(
    () => ({
      updateTaskList: (taskList: Task[]) =>
        setTasks(taskList.map(TaskMapper.toView)),
    }),
    []
  );

  return {
    taskList,
    taskStore,
  };
};
