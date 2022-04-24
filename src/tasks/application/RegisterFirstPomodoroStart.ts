import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { FirstPomodoroStartedAt } from "../domain/FirstPomodoroStartedAt";

interface Input {
  taskId: string;
  date: FirstPomodoroStartedAt;
}

export const RegisterFirstPomodoroStart: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ date, taskId }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task || task.isFirstPomodoroStarted()) return;

      task.registerFirstPomodoroStartedAt(date);

      await taskRepository.update(task);
    },
  };
};
