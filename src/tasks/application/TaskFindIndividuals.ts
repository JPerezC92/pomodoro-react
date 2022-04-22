import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskStore } from "../domain/TaskStore";

export const TaskFindIndividuals: (props: {
  taskRepository: TaskRepository;
  taskStore: TaskStore;
}) => UseCase<Promise<void>> = ({ taskRepository, taskStore }) => {
  return {
    execute: async () => {
      const taskList = await taskRepository.findIndividuals();

      taskStore.updateTasks(taskList);
    },
  };
};
