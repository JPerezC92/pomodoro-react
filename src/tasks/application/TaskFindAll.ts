import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "../domain/Task";
import { TaskListStore } from "../domain/TaskListStore";
import { TaskRepository } from "../domain/TaskRepository";
import { TaskStore } from "../domain/TaskStore";

interface Input {
  projectId?: string;
}

export const TaskFindAll: (props: {
  taskRepository: TaskRepository;
  taskListStore: TaskListStore;
}) => UseCase<Promise<void>, Input> = ({ taskRepository, taskListStore }) => {
  return {
    execute: async ({ projectId }) => {
      const tasks = await taskRepository.findAll(projectId);

      taskListStore.updateTaskList(tasks);
    },
  };
};
