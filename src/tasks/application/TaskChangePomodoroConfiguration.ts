import {
  PomodoroConfiguration,
  PomodoroConfigurationProps,
} from "@/pomodoro/domain/PomodoroConfiguration";
import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "../domain/TaskRepository";

interface Input {
  pomodoroConfiguration: PomodoroConfiguration;
  taskId: string;
}

export const TaskChangePomodoroConfiguration: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({ pomodoroConfiguration, taskId }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      task.changePomodoroConfiguration(pomodoroConfiguration);

      await taskRepository.update(task);
    },
  };
};
