import { UseCase } from "@/shared/domain/UseCase";
import { Task } from "@/tasks/domain/Task";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskStore } from "../domain/TaskStore";

interface Input {
  taskId: string;
}

export const TaskFindById: (props: {
  taskRepository: TaskRepository;
  taskStore?: TaskStore;
}) => UseCase<Promise<Task | undefined>, Input> = ({
  taskRepository,
  taskStore,
}) => {
  return {
    async execute({ taskId: string }) {
      const task = await taskRepository.findById({ id: string });

      if (!task) {
        taskStore?.taskNotFound();
        return;
      }

      if (taskStore) taskStore.updateTask(task);

      return task;
    },
  };
};
