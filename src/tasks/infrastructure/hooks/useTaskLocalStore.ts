import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import { Task } from "@/tasks/domain/Task";
import { TaskStore } from "@/tasks/domain/TaskStore";
import { useMemo, useState } from "react";
import { TaskViewDto } from "../dto/task.dto";
import { TaskMapper } from "../mappers/TaskMapper";

export const useTaskLocalStore = () => {
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
