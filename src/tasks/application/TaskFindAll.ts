import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "../domain/Task";
import { TaskRepository } from "../domain/TaskRepository";

export const TaskFindAll: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<Task[]>> = ({ taskRepository }) => {
  return {
    execute: async () => {
      const tasks = await taskRepository.findAll();
      return tasks;
    },
  };
};
