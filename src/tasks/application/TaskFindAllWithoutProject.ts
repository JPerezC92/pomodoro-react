import { UseCase } from "@/shared/domain/UseCase";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

export const TaskFindAllWithoutProject: (props: {
  taskRepository: TaskRepository;
  taskListStore: TaskListStore;
}) => UseCase<Promise<void>> = ({ taskRepository, taskListStore }) => {
  return {
    execute: async () => {
      const tasks = await taskRepository.findAllWithoutProject();

      taskListStore.updateTaskList(tasks);
    },
  };
};
