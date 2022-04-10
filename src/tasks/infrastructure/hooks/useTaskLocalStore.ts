import { useMemo, useState } from "react";

import { TaskStore } from "@/tasks/application/TaskStore";
import { Task } from "@/tasks/domain/Task";
import { TaskDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskMapper } from "@/tasks/infrastructure/TaskMapper";

export const useTaskLocalStore = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);

  const taskStore: TaskStore = useMemo(
    () => ({
      updateTasks: (tasks: Task[]) => setTasks(tasks.map(TaskMapper.toTaskDto)),
    }),
    []
  );

  return {
    tasks,
    taskStore,
  };
};
