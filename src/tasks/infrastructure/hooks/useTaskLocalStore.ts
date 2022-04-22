import { useMemo, useState } from "react";

import { TaskStore } from "@/tasks/domain/TaskStore";
import { Task } from "@/tasks/domain/Task";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskLocalStore = () => {
  const [tasks, setTasks] = useState<TaskViewDto[]>([]);

  const taskStore: TaskStore = useMemo(
    () => ({
      updateTasks: (tasks: Task[]) => setTasks(tasks.map(TaskMapper.toView)),
    }),
    []
  );

  return {
    tasks,
    taskStore,
  };
};
