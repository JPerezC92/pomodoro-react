import { Pomodoro } from "@/pomodoro/domain/Pomodoro";
import { PomodoroStore } from "@/pomodoro/domain/PomodoroStore";
import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { UseCase } from "@/shared/domain/UseCase";
import { IncrementTimeSpent } from "@/tasks/application/IncrementTimeSpent";
import { LastPomodoroEndedAt } from "@/tasks/domain/LastPomodoroEndedAt";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskRepository } from "@/tasks/domain/TaskRepository";
import { TaskStore } from "@/tasks/domain/TaskStore";

interface Input {
  taskId: string;
  pomodoroCurrentStep: PomodoroStepType;
  stepSeconds: number;
}

export const PomodoroGoToNextStep: (props: {
  pomodoroStore: PomodoroStore;
  taskStore: TaskStore;
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({
  pomodoroStore,
  taskStore,
  taskRepository,
}) => {
  const recordElapsedTime = IncrementTimeSpent({ taskRepository });

  return {
    execute: async ({ taskId, pomodoroCurrentStep, stepSeconds }) => {
      await recordElapsedTime.execute({
        seconds: new Second(stepSeconds),
        taskId: new TaskId(taskId),
        pomodoroCurrentStep,
      });

      const task = await taskRepository.findById({ id: taskId });

      if (!task) return taskStore.taskNotFound();

      const pomodoro = new Pomodoro({
        task,
        currentStep: pomodoroCurrentStep,
      });

      if (pomodoro.isSessionFinished()) {
        task.incrementSessionCount();
        task.registerLastPomodoroEndedAt(new LastPomodoroEndedAt(new Date()));

        taskRepository.update(task);
        taskStore.updateTask(task);
      }

      pomodoro.toTheNextStep();
      pomodoroStore.updatePomodoro(pomodoro);
    },
  };
};
