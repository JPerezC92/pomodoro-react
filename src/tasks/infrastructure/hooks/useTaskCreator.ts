import { Task } from "@/tasks/domain/Task";
import { useCallback } from "react";
import { TaskCreateDto } from "../dto/task-create.dto";

export const useTaskCreator = () => {
  const taskCreatorRun = useCallback((taskCreateDto: TaskCreateDto) => {
    const task = new Task({
      ...taskCreateDto,
      id: `${+Date.now()}`,
    });

    return task;
  }, []);

  return {
    taskCreatorRun,
  };
};
