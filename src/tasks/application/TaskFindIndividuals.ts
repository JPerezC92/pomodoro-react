import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskListStore } from "../domain/TaskListStore";

export const TaskFindIndividuals: (props: {
  taskRepository: TaskRepository;
  taskStore: TaskListStore;
}) => UseCase<Promise<void>> = ({ taskRepository, taskStore }) => {
  return {
    execute: async () => {
      const taskList = await taskRepository.findIndividuals();

      taskStore.updateTaskList(taskList);
    },
  };
};
