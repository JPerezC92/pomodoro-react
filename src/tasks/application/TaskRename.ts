import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
  newName: string;
}

export const TaskRename: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ newName, taskId }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      task.changeName(newName);

      await taskRepository.update(task);
    },
  };
};
