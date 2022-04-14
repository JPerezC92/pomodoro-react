import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
}

export const TaskFindById: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<Task | undefined>, Input> = ({ taskRepository }) => {
  return {
    async execute({ taskId: string }) {
      const task = await taskRepository.findById({ id: string });

      if (!task) return;

      return task;
    },
  };
};
