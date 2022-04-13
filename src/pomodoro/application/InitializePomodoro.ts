import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { Pomodoro } from "../domain/Pomodoro";
import { testTaskConfiguration } from "../domain/PomodoroConfiguration";
import { PomodoroStore } from "../domain/PomodoroStore";

interface Input {
  taskId: string;
}

export const InitializePomodoro: (props: {
  taskRepository: TaskRepository;
  pomodoroStore: PomodoroStore;
}) => UseCase<Promise<void>, Input> = ({ taskRepository, pomodoroStore }) => {
  return {
    execute: async ({ taskId }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      const pomodoro = new Pomodoro({
        task: { ...task, taskConfiguration: testTaskConfiguration },
      });

      pomodoroStore.updatePomodoro(pomodoro);
    },
  };
};
