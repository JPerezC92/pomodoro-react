import { useMemo, useState } from "react";

import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { Task } from "@/tasks/domain/Task";
import { TaskStore } from "@/tasks/domain/TaskStore";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { TaskMapper } from "@/tasks/infrastructure/mappers/TaskMapper";

export const useTaskState = () => {
  const [task, setTask] = useState<TaskViewDto | typeof NOT_FOUND | undefined>(
    undefined
  );

  const taskStore: TaskStore = useMemo(
    () => ({
      updateTask: (task: Task) => setTask(TaskMapper.toView(task)),
      taskNotFound: () => setTask(NOT_FOUND),
    }),
    []
  );

  return {
    task,
    taskStore,
  };
};
