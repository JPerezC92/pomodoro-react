import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  currentTaskId: string;
}

export const TaskFindNext: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<Task | undefined>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ currentTaskId }: Input): Promise<Task | undefined> => {
      const task = await taskRepository.findNextTask(currentTaskId);

      return task;
    },
  };
};
