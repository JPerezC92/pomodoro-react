import { UseCase } from "@/shared/domain/UseCase";

import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskHistory } from "@/tasks/domain/TaskHistory";

export const TaskFindHistory: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<TaskHistory[]>> = ({ taskRepository }) => {
  return {
    execute: async () => {
      const taskHistory = await taskRepository.history();

      return taskHistory;
    },
  };
};
