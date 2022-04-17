import { UseCase } from "@/shared/domain/UseCase";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  seconds: Second;
  taskId: TaskId;
}

export const RecordElapsedTime: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ seconds, taskId }): Promise<void> => {
      const task = await taskRepository.findById({ id: taskId.value });

      if (!task) return;

      task.recordElapsedTime(seconds);

      await taskRepository.update(task);
    },
  };
};
