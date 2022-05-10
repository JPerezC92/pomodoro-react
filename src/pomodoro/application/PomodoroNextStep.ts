import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { SessionCounter } from "@/pomodoro/domain/PomodoroCount";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { UseCase } from "@/shared/domain/UseCase";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  taskId: string;
  pomodoroCurrentStep: PomodoroStepType;
  sessionsCount: number;
}

export const PomodoroNextStep: (props: {
  pomodoroStore: PomodoroStore;
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ pomodoroStore, taskRepository }) => {
  return {
    execute: async ({ taskId, pomodoroCurrentStep, sessionsCount }) => {
      const task = await taskRepository.findById({ id: taskId });

      if (!task) return;

      const pomodoro = new Pomodoro({
        task,
        sessionCounter: new SessionCounter(sessionsCount),
        currentStep: pomodoroCurrentStep,
      });

      if (pomodoro.isBlockFinished()) pomodoro.incrementSessions();

      pomodoro.nextStep();
      pomodoroStore.updatePomodoro(pomodoro);
    },
  };
};
