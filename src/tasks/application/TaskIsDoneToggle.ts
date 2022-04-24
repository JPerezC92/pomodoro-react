import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
  isCompleted: boolean;
}
export const TaskIsDoneToggle: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ isCompleted, taskId }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      isCompleted ? task.markAsUndone() : task.markAsDone();

      await taskRepository.update(task);
    },
  };
};
