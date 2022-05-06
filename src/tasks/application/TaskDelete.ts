import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";
interface Input {
  taskId: string;
}

export const TaskDelete: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ taskId }) => {
      await taskRepository.delete(taskId);
    },
  };
};
