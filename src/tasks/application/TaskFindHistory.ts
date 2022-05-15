import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskHistoryStore } from "../domain/TaskHistoryStore";

export const TaskFindHistory: (props: {
  taskRepository: TaskRepository;
  taskHistoryStore: TaskHistoryStore;
}) => UseCase<Promise<void>> = ({ taskRepository, taskHistoryStore }) => {
  return {
    execute: async () => {
      const taskHistory = await taskRepository.findAll();
      taskHistoryStore.updateTaskHistoryList(taskHistory);
    },
  };
};
