import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

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

      const pomodoro = Pomodoro.initialize({ task });

      pomodoroStore.updatePomodoro(pomodoro);
    },
  };
};
