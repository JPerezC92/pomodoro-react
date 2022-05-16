import { UseCase } from "@/shared/domain/UseCase";
import { TaskListStore } from "@/tasks/domain/TaskListStore";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  projectId: string;
}

export const TaskFindByProject: (props: {
  taskRepository: TaskRepository;
  taskListStore: TaskListStore;
}) => UseCase<Promise<void>, Input> = ({ taskListStore, taskRepository }) => {
  return {
    execute: async ({ projectId }) => {
      const taskList = await taskRepository.findByProjectId({ projectId });

      taskListStore.updateTaskList(taskList);
    },
  };
};
