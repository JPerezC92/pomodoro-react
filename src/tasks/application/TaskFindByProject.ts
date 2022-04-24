import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskListStore } from "../domain/TaskListStore";

interface Input {
  projectId: string;
}

export const TaskFindByProject: (props: {
  taskRepository: TaskRepository;
  taskStore: TaskListStore;
}) => UseCase<Promise<void>, Input> = ({ taskRepository, taskStore }) => {
  return {
    execute: async ({ projectId }) => {
      const tasks = await taskRepository.findByProjectId({ projectId });
      taskStore.updateTaskList(tasks);
    },
  };
};
