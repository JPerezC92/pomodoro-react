import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskStore } from "../domain/TaskStore";

interface Input {
  projectId: string;
}

export const TaskFindByProject: (props: {
  taskRepository: TaskRepository;
  taskStore: TaskStore;
}) => UseCase<Promise<void>, Input> = ({ taskRepository, taskStore }) => {
  return {
    execute: async ({ projectId }) => {
      const tasks = await taskRepository.findByProjectId({ projectId });
      taskStore.updateTasks(tasks);
    },
  };
};
