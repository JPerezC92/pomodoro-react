import { PomodoroStepType } from "@/pomodoro/domain/Step";
import { UseCase } from "@/shared/domain/UseCase";
import { Second } from "@/tasks/domain/Second";
import { TaskId } from "@/tasks/domain/TaskId";
import { TaskRepository } from "@/tasks/domain/TaskRepository";

interface Input {
  seconds: Second;
  taskId: TaskId;
  pomodoroCurrentStep: PomodoroStepType;
}

export const IncrementTimeSpent: (props: {
  taskRepository: TaskRepository;
}) => UseCase<Promise<void>, Input> = ({ taskRepository }) => {
  return {
    execute: async ({
      seconds,
      taskId,
      pomodoroCurrentStep,
    }): Promise<void> => {
      const task = await taskRepository.findById({ id: taskId.value });

      if (!task) return;

      if (pomodoroCurrentStep === PomodoroStepType.FOCUS) {
        task.incrementFocusTimeSpend(seconds);
      }

      if (
        pomodoroCurrentStep === PomodoroStepType.BREAK ||
        pomodoroCurrentStep === PomodoroStepType.LONG_BREAK
      ) {
        task.incrementBreakTimeSpend(seconds);
      }

      await taskRepository.update(task);
    },
  };
};
