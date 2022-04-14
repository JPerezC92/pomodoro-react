import { Step } from "@/pomodoro/domain/Step";
import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
  pomodoro: Pomodoro;
}

export const PomodoroNextStep: (props: {
  pomodoroStore: PomodoroStore;
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ pomodoroStore, taskRepository }) => {
  return {
    execute: async ({ taskId, pomodoro: pomodoroFromView }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      const pomodoro = new Pomodoro({
        task,
        pomodoroCount: pomodoroFromView.pomodoroCount,
        currentStep: pomodoroFromView.currentStep,
      });

      if (pomodoro.isBlockFinished()) {
        pomodoro.incrementCount();
      }

      pomodoro.nextStep();
      pomodoroStore.updatePomodoro(pomodoro);
    },
  };
};
